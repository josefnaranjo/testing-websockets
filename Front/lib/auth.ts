import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react'

export async function getCurrentUser(req: NextApiRequest) {
  const session = await getSession({ req });
  return session?.user ?? null;
}