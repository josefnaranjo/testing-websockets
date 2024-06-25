import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  console.log('Request received');

  const { userId, imageUrl } = await req.json();
  console.log('Parsed request body:', { userId, imageUrl });

  if (!userId || !imageUrl) {
    console.log('Missing userId or imageUrl');
    return NextResponse.json({ message: 'Missing userId or imageUrl' }, { status: 400 });
  }

  try {
    // Update user image in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { image: imageUrl },
    });

    console.log('User image updated:', updatedUser);

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating user image:', error);
    return NextResponse.json({ message: 'Error updating user image' }, { status: 500 });
  }
}
