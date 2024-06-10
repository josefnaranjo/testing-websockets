import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get('query');

    let servers;
    if (query) {
      servers = await prisma.server.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { id: { contains: query } },
          ],
        },
      });
    } else {
      servers = await prisma.server.findMany();
    }

    return NextResponse.json(servers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch servers' }, { status: 500 });
  }
}
