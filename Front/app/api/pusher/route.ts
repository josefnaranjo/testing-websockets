import { NextResponse } from "next/server";
import Pusher from "pusher";
import prisma from "@/prisma/client"; // Ensure this path matches your actual path

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(req: Request) {
  const { channelName, eventName, message } = await req.json();

  try {
    // Save the message to the database first
    const savedMessage = await prisma.message.create({
      data: {
        content: message.content,
        channelId: message.channelId,
        userId: message.userId,
      },
      include: {
        user: true, // Include the related user information
      },
    });

    // Ensure user data is included in the message for Pusher
    const messageWithUser = {
      id: savedMessage.id,
      content: savedMessage.content,
      userId: savedMessage.userId,
      createdAt: savedMessage.createdAt,
      updatedAt: savedMessage.updatedAt,
      user: {
        name: savedMessage.user.name,
        image: savedMessage.user.image,
      },
    };

    // Trigger Pusher event with the complete message including user data
    await pusher.trigger(channelName, eventName, messageWithUser);

    return NextResponse.json({ success: true, message: savedMessage });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { error: "Error saving message" },
      { status: 500 }
    );
  }
}
