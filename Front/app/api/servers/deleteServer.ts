import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    await prisma.server.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: 'Server deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete server' }, { status: 500 });
  }
}
