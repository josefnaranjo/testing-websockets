import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

// GET handler
export async function GET(req: NextRequest) {
  try {
    const user = await prisma.settings.findUnique({
      where: { username: 'Draco' }, 
    });
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
    const updatedUser = await prisma.settings.update({
      where: { id: body.id },
      data: body,
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user data:', error);
    return NextResponse.json({ error: 'Failed to update user data' }, { status: 500 });
  }
}
