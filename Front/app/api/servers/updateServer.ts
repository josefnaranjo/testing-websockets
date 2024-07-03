import { NextRequest, NextResponse } from 'next/server';
import { db as prisma } from "@/lib/db";
import { currentUser } from '@/lib/current-user';

export async function PUT(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id: serverId, name } = await request.json();

    // Fetch the user's role in the server
    const member = await prisma.member.findFirst({
      where: {
        serverId,
        userId: user.id,
      },
    });

    if (!member) {
      return NextResponse.json({ error: 'You are not a member of this server' }, { status: 405 });
    }

    // Check if the user is an Admin or Moderator, will implement this functionality later
    if (member.role !== 'ADMIN' && member.role !== 'MODERATOR') {
      return NextResponse.json({ error: 'You do not have permission to update this server' }, { status: 403 });
    }

    // Update the server name
    const updatedServer = await prisma.server.update({
      where: { id: serverId },
      data: { name },
    });

    return NextResponse.json(updatedServer, { status: 200 });
  } catch (error) {
    console.error('Failed to update server:', error);
    return NextResponse.json({ error: 'Failed to update server' }, { status: 500 });
  }
}
