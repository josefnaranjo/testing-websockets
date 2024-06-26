import { getSession } from 'next-auth/react';
import { db } from '@/lib/db';


export const currentProfile = async () => {
  const session = await getSession();

  console.log(session);

  if (!session || !session.user?.id) {
    console.error('No session or session.user.id found');
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: session.user.id as string, // Ensure userId is treated as a string
    },
  });

  return profile;
};
