import { NextRequest, NextResponse } from 'next/server';
import { db as prisma } from "@/lib/db";
import { currentUser } from '@/lib/current-user';

 

export async function DELETE(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id: serverId } = await request.json();

    // Fetch the user's role in the server
    const member = await prisma.member.findFirst({
      where: {
        serverId,
        userId: user.id,
      },
    });

    // Check if the user is a member
    if (!member) {
      return NextResponse.json({ error: 'You are not a member of this server' }, { status: 403 });
    }

    // Check if the user is an Admin or Moderator, if they're not then they CANNOT delete the server, will implement this later
    if (member.role !== 'ADMIN' && member.role !== 'MODERATOR') {
      return NextResponse.json({ error: 'You do not have permission to delete this server' }, { status: 403 });
    }

    // Delete the server from the database, erasing everything
    await prisma.server.delete({
      where: {
        id: serverId,
      },
    });

    return NextResponse.json({ message: 'Server deleted' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete server:', error);
    return NextResponse.json({ error: 'Failed to delete server' }, { status: 500 });
  }
}
