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

    console.log(`Deleting message with ID: ${messageId}`);
    const message = await prisma.message.delete({
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
