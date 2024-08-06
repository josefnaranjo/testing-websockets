'use server'

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { User } from "@prisma/client"; // Import your Prisma User type

export const currentUser = async (): Promise<User | null> => {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      console.error("No session or session.user.id found");
      return null;
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      console.error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};
