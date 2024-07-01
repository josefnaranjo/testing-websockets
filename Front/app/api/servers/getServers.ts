import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { currentUser } from '@/lib/current-user';

const prisma = new PrismaClient();

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
