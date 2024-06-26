import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { db as prisma } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';

export async function POST(request: NextRequest, res: NextResponse) {
  console.log('Outside try block..')
  try {
    
    const { name, imageUrl } = await request.json();
    const profile = await currentProfile();
    console.log('testing.')

    if (!profile) {
      
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    console.log(profile.id);

    const newServer = await prisma.server.create({
      data: {
        profileId: profile.id,
        name,
        imageURL: imageUrl || '',
        inviteCode: uuidv4(),
        channels: { 
          create: {
            name: 'general',
            type: 'TEXT',
            profileId: profile.id,
          }
        },
      },
    });

    return NextResponse.json(newServer, { status: 201 });
  } catch (error) {
    console.error('Error creating server:', error);
    return NextResponse.json({ error: 'Failed to create server' }, { status: 500 });
  }
}
