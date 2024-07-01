import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "./schemas";

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            // return the user object if the passwords match
            return user;
          }
        }

        // return null if the credentials are not valid
        return null;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub || ''; // Ensure token.sub is a string or fallback to an empty string
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id; // Ensure token.sub is set correctly
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

export default authConfig;