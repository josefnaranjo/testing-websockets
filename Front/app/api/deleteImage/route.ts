import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function POST(req: NextRequest) {
  console.log('Delete image request received');  // Log when the request is received

  try {
    const { userId } = await req.json();
    console.log('Parsed request body:', { userId });  // Log parsed request body

    if (!userId) {
      console.log('Missing userId');  // Log if userId is missing
      return NextResponse.json({ message: 'Missing userId' }, { status: 400 });
    }

    // Update user image in the database to null
    const user = await prisma.user.update({
      where: { id: userId },
      data: { image: null },
    });

    console.log('User image deleted:', user);  // Log successful update

    return NextResponse.json({ message: 'User image deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user image:', error);  // Log error details
    return NextResponse.json({ message: 'Error deleting user image' }, { status: 500 });
  }
}
