import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@/lib/current-user';
import prisma from '@/prisma/client';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  console.log('Request received');

  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { imageUrl } = await req.json();
    console.log('Parsed request body:', { imageUrl });

    if (!imageUrl) {
      console.log('Missing imageUrl');
      return NextResponse.json({ message: 'Missing imageUrl' }, { status: 400 });
    }

    // Update user image in the database
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { image: imageUrl },
    });

    console.log('User image updated:', updatedUser);

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating user image:', error);
    return NextResponse.json({ message: 'Error updating user image' }, { status: 500 });
  }
}
