import { NextRequest, NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { currentUser } from "@/lib/current-user";

export async function DELETE(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      console.error("User not authenticated");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { pathname } = new URL(req.url);
    const messageId = pathname.split("/").pop();

    if (!messageId) {
      console.error("Missing messageId");
      return NextResponse.json({ error: "Missing messageId" }, { status: 400 });
    }

    // Fetch the message to check the owner
    const message = await prisma.message.findUnique({
      where: { id: messageId },
      select: { userId: true },
    });

    if (!message) {
      console.error("Message not found");
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    // Check if the current user is the owner of the message
    if (message.userId !== user.id) {
      console.error("Unauthorized: User is not the owner of the message");
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    console.log(`Deleting message with ID: ${messageId}`);
    await prisma.message.delete({
      where: { id: messageId },
    });

    console.log("Message deleted successfully:", message);
    return NextResponse.json(
      { message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 }
    );
  }
}
