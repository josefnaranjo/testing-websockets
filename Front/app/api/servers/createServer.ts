import { currentUser } from "@/lib/current-user";
import { db as prisma } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const { name, imageUrl } = await request.json();
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const server = await prisma.server.create({
      data: {
        userId: user.id,
        name,
        imageURL: imageUrl || "",
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: "general",
              type: "TEXT",
              userId: user.id,
            },
          ],
        },
        members: {
          create: [{ userId: user.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(server, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create server" },
      { status: 500 }
    );
  }
}