// api/servers/[serverId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db as prisma } from "@/lib/db";
import { currentUser } from '@/lib/current-user';

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      console.error('User not authenticated');
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { pathname } = new URL(req.url);
    const serverId = pathname.split('/').pop();

    if (!serverId) {
      console.error('Missing serverId');
      return NextResponse.json({ error: 'Missing serverId' }, { status: 400 });
    }

    console.log(`Fetching server with ID: ${serverId}`);
    const server = await prisma.server.findUnique({
      where: { id: serverId },
    });

    if (!server) {
      console.error('Server not found');
      return NextResponse.json({ error: 'Server not found' }, { status: 404 });
    }

    console.log('Server fetched successfully:', server);
    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.error('Error fetching server:', error);
    return NextResponse.json({ error: 'Failed to fetch server' }, { status: 500 });
  }
}
