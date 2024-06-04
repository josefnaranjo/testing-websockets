import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { id, name } = await request.json();
    const newServer = await prisma.server.create({
      data: {
        id,
        name,
      },
    });
    return NextResponse.json(newServer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create server' }, { status: 500 });
  }
}
