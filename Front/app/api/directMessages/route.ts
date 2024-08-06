import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const channelId = params.get("id") || "";
  const startTS = parseInt(params.get("createdTS") || "0");

  try {
    const messages = await prisma.message.findMany({
      where: {
        channelId,
        createdAt: {
          gte: new Date(startTS), // Assuming createdTS is a timestamp in milliseconds
        },
      },
      include: {
        user: {
          select: { name: true, image: true },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Error fetching messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { channelId, content, userId } = body;

  try {
    const savedMessage = await prisma.message.create({
      data: {
        content,
        channelId: String(channelId),
        userId,
      },
      include: {
        user: {
          select: { name: true, image: true },
        },
      },
    });

    return NextResponse.json(savedMessage, { status: 201 });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { error: "Error saving message" },
      { status: 500 }
    );
  }
}
