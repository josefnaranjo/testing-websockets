import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { id, name } = await request.json();

    // Validate that id and name are provided
    if (!id || !name) {
      return NextResponse.json({ error: 'ID and Name are required' }, { status: 400 });
    }

    const newServer = await prisma.server.create({
      data: {
        id,
        name,
      },
    });

    return NextResponse.json(newServer, { status: 201 });
  } catch (error) {
    console.error('Error creating server:', error);
    return NextResponse.json({ error: 'Failed to create server' }, { status: 500 });
  }
}
