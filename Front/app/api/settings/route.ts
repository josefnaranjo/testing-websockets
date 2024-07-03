import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { currentUser } from '@/lib/current-user';

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      console.log('Unauthorized access attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = user.id;
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true, // Ensure email is included
        image: true,
        createdAt: true,
        settings: {
          select: {
            username: true,
            name: true,
            dob: true,
            business: true,
            memberSince: true,
            email: true, // Include settings email
            phone: true,
            country: true,
            language: true,
            about: true,
          },
        },
      },
    });

    if (!userData) {
      console.log('User not found for ID:', userId);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Ensure settings is not null
    if (userData.settings === null) {
      userData.settings = {
        username: '',
        name: '',
        dob: '',
        business: '',
        memberSince: '',
        email: userData.email || '', // Fallback to main email if settings email is not available
        phone: '',
        country: '',
        language: '',
        about: '',
      };
    } else if (!userData.settings.email) {
      userData.settings.email = userData.email || '';
    }

    console.log('Fetched user data:', userData);
    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      console.log('Unauthorized access attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = user.id;
    const body = await req.json();
    const { settings, ...userData } = body;

    const userUpdateData: any = {};
    const settingsUpdateData: any = {};

    // Update user fields
    if (userData.image) userUpdateData.image = userData.image;

    // Shared fields to be updated in both User and Settings
    if (settings.email) {
      userUpdateData.email = settings.email;
      settingsUpdateData.email = settings.email;
    }
    if (settings.name) {
      userUpdateData.name = settings.name;
      settingsUpdateData.name = settings.name;
    }

    // Update settings-specific fields
    if (settings.about) settingsUpdateData.about = settings.about;
    if (settings.username) settingsUpdateData.username = settings.username;
    if (settings.dob) settingsUpdateData.dob = settings.dob;
    if (settings.business) settingsUpdateData.business = settings.business;
    if (settings.memberSince) settingsUpdateData.memberSince = settings.memberSince;
    if (settings.phone) settingsUpdateData.phone = settings.phone;
    if (settings.country) settingsUpdateData.country = settings.country;
    if (settings.language) settingsUpdateData.language = settings.language;

    console.log('Updating user data:', userUpdateData);
    console.log('Updating settings data:', settingsUpdateData);

    if (Object.keys(userUpdateData).length > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: userUpdateData,
      });
    }

    const updatedSettings = await prisma.settings.upsert({
      where: { userId: userId },
      update: settingsUpdateData,
      create: {
        userId: userId,
        username: settings.username || '',
        name: settings.name || '',
        dob: settings.dob || '',
        business: settings.business || '',
        memberSince: settings.memberSince || '',
        email: settings.email || '',
        phone: settings.phone || '',
        country: settings.country || '',
        language: settings.language || '',
        about: settings.about || '',
      },
    });

    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        settings: {
          select: {
            username: true,
            name: true,
            dob: true,
            business: true,
            memberSince: true,
            email: true,
            phone: true,
            country: true,
            language: true,
            about: true,
          },
        },
      },
    });

    console.log('Updated user data:', updatedUser);
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user data:', error);
    return NextResponse.json({ error: 'Failed to update user data' }, { status: 500 });
  }
}
