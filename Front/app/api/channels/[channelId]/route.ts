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
    const channelId = pathname.split('/').pop();

    if (!channelId) {
      console.error('Missing channelId');
      return NextResponse.json({ error: 'Missing channelId' }, { status: 400 });
    }

    console.log(`Fetching channel with ID: ${channelId}`);
    const channel = await prisma.channel.findUnique({
      where: { id: channelId },
    });

    if (!channel) {
      console.error('Channel not found');
      return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
    }

    console.log('Channel fetched successfully:', channel);
    return NextResponse.json(channel, { status: 200 });
  } catch (error) {
    console.error('Error fetching channel:', error);
    return NextResponse.json({ error: 'Failed to fetch channel' }, { status: 500 });
  }
}
