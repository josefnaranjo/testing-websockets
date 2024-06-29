import { db } from "@/lib/db";
import { auth } from "@/auth";

export const currentProfile = async () => {
  const session = await auth();

  console.log(session);

  if (!session || !session.user?.id) {
    console.error("No session or session.user.id found");
    return null;
  }

  const profile = await db.user.findUnique({
    where: { id: session.user.id },
  });

  return profile;
};