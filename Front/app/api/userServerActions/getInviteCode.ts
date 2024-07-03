import { NextRequest, NextResponse } from 'next/server';
import { db as prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const serverId = searchParams.get('serverId');

  if (!serverId) {
    return NextResponse.json({ error: 'Missing server ID' }, { status: 400 });
  }

  try {
    const server = await prisma.server.findUnique({ // Finds the server and selects the inviteCode
      where: { id: serverId },
      select: { inviteCode: true }
    });

    if (!server) {
      return NextResponse.json({ error: 'Server not found' }, { status: 404 });
    }

    return NextResponse.json({ inviteCode: server.inviteCode }, { status: 200 }); // Invite code retrieved
  } catch (error) {
    console.error('Failed to fetch invite code:', error);
    return NextResponse.json({ error: 'Failed to fetch invite code' }, { status: 500 });
  }
}
