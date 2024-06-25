import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

// GET handler
export async function GET(req: NextRequest) {
  try {
    const user = await prisma.settings.findUnique({
      where: { userId: 'clw9s8n6u0001p42u77kw186u' },
      include: {
        user: {
          select: {
            image: true, // Include the image field from the User model
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}

// PUT handler
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, ...updateData } = body;

    const updatedUser = await prisma.settings.update({
      where: { userId: userId },
      data: updateData,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user data:', error);
    return NextResponse.json({ error: 'Failed to update user data' }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
