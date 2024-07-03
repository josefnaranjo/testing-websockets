import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@/lib/current-user';
import prisma from '@/prisma/client';

export async function POST(req: NextRequest) {
  console.log('Delete image request received');  // Log when the request is received

  try {
    const user = await currentUser();
    if (!user) {
      console.log('Unauthorized request');  // Log unauthorized access attempt
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Update user image in the database to null
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { image: null },
    });

    console.log('User image deleted:', updatedUser);  // Log successful update

    return NextResponse.json({ message: 'User image deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user image:', error);  // Log error details
    return NextResponse.json({ message: 'Error deleting user image' }, { status: 500 });
  }
}
