import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const servers = await prisma.server.findMany();
    return NextResponse.json(servers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch servers' }, { status: 500 });
  }
}

// Example for POST method if needed
export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "Hello World post" }, { status: 200 });
}
