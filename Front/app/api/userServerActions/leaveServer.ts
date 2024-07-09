import { NextRequest, NextResponse } from 'next/server';
import { db as prisma } from "@/lib/db";
import { currentUser } from '@/lib/current-user';

export async function DELETE(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { serverId } = await req.json();

    if (!serverId) {
      return NextResponse.json({ error: 'Missing server ID' }, { status: 400 });
    }

    // Check if the user is a member of the server
    const member = await prisma.member.findFirst({
      where: {
        serverId,
        userId: user.id,
      },
    });

    if (!member) {
      return NextResponse.json({ error: 'You are not a member of this server' }, { status: 404 });
    }

    // Remove the member from the server
    await prisma.member.delete({
      where: {
        id: member.id,
      },
    });

    return NextResponse.json({ message: 'Successfully left the server' }, { status: 200 });
  } catch (error) {
    console.error('Failed to leave server:', error);
    return NextResponse.json({ error: 'Failed to leave server' }, { status: 500 });
  }
}
