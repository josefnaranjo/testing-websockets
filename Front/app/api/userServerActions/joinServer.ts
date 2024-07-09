import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@/lib/current-user';
import { db as prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { inviteCode } = await req.json();

    if (!inviteCode) {
      return NextResponse.json({ error: 'Missing invite code' }, { status: 400 });
    }

    // Find the server by invite code
    const server = await prisma.server.findFirst({
      where: { inviteCode: inviteCode },
    });

    if (!server) {
      return NextResponse.json({ error: 'Invalid invite code' }, { status: 404 });
    }

    // Check if the user is already a member of the server
    const existingMember = await prisma.member.findFirst({
      where: {
        serverId: server.id,
        userId: user.id,
      },
    });

    if (existingMember) {
      return NextResponse.json({ error: 'You are already a member of this server' }, { status: 400 });
    }

    // Add the user to the server
    const newMember = await prisma.member.create({
      data: {
        serverId: server.id,
        userId: user.id,
        role: 'GUEST', // Default role, adjust as needed
      },
    });

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error('Failed to join server:', error);
    return NextResponse.json({ error: 'Failed to join server' }, { status: 500 });
  }
}
