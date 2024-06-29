import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { db as prisma } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';

export async function POST(request: NextRequest, res: NextResponse) {
  console.log("Outside try block..");
  try {
    const { name, imageUrl } = await request.json();
    const profile = await currentProfile();
    console.log("Inside try block.");
    console.log(profile);

    if (!profile) {
      console.log("Profile not found. Unauthorized access.");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    console.log(`Profile ID: ${profile.id}`);

    // Verify profile exists in the database
    const profileExists = await prisma.profile.findUnique({
      where: { id: profile.id },
    });

    if (!profileExists) {
      console.log(`Profile with ID ${profile.id} does not exist in the database.`);
      return NextResponse.json({ error: `Profile with ID ${profile.id} does not exist` }, { status: 400 });
    }

    const newServer = await prisma.server.create({
      data: {
        profileId: profile.id,
        name,
        imageURL: imageUrl || "",
        inviteCode: uuidv4(),
        channels: {
          create: {
            name: "general",
            type: "TEXT",
            profileId: profile.id,
          },
        },
      },
    });

    console.log("Server created successfully:", newServer);
    return NextResponse.json(newServer, { status: 201 });
  } catch (error) {
    console.error("Error creating server:", error);
    return NextResponse.json(
      { error: "Failed to create server", details: error },
      { status: 500 }
    );
  }
}
