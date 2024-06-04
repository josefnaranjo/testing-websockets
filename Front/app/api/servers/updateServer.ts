import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  try {
    const { id, name } = await request.json();
    const updatedServer = await prisma.server.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(updatedServer, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update server' }, { status: 500 });
  }
}
