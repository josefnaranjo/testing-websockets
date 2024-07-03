import { NextRequest, NextResponse } from 'next/server';
import { db as prisma } from "@/lib/db";
import { currentUser } from '@/lib/current-user';

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { name, type, serverId } = await req.json();

    if (!name || !type || !serverId) {
      return NextResponse.json({ error: 'Name, type, and server ID are required' }, { status: 400 });
    }

    const channel = await prisma.channel.create({
      data: {
        name,
        type,
        serverId,
        userId: user.id,
      },
    });

    return NextResponse.json(channel, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating channel' }, { status: 500 });
  }
}
