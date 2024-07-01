import { auth } from "@/auth";
import { db } from "@/lib/db";

export const currentUser = async () => {
  const session = await auth();

  console.log(session);

  if (!session || !session.user?.id) {
    console.error("No session or session.user.id found");
    return null;
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  return user;
};
