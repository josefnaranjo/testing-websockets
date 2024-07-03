import { NextRequest, NextResponse } from 'next/server';
import { db as prisma } from "@/lib/db";
import { currentUser } from '@/lib/current-user';

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const servers = await prisma.server.findMany({
      where: {
        members: {
          some: {
            userId: user.id,
          },
        },
      },
    });

    return NextResponse.json(servers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch servers' }, { status: 500 });
  }
}
