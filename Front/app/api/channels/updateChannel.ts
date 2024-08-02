import { NextRequest, NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { currentUser } from "@/lib/current-user";

export async function PUT(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id, name, type } = await req.json();

    if (!id || !name || !type) {
      return NextResponse.json(
        { error: "ID, name, and type are required" },
        { status: 400 }
      );
    }

    const channel = await prisma.channel.update({
      where: { id },
      data: { name, type },
    });

    return NextResponse.json(channel, { status: 200 });
  } catch (error: any) {
    console.error("Error updating channel:", error.message || error);
    return NextResponse.json(
      { error: "Error updating channel" },
      { status: 500 }
    );
  }
}
