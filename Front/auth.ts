import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account, profile, email, credentials }) {
      console.log("SignIn Callback: Checking profile creation");

      // Check if a profile exists for the user
      const existingProfile = await db.profile.findUnique({
        where: { userId: user.id },
      });

      if (!existingProfile) {
        console.log(`Creating profile for user ID: ${user.id}`);

        // Ensure userId and email are always strings
        const userId = user.id || "defaultUserId";
        const userEmail = user.email || "default@example.com";

        // Create a profile if it does not exist
        const newProfile = await db.profile.create({
          data: {
            userId: userId as string, // Type assertion to ensure userId is string
            name: user.name || "Default Name",
            imgURL: user.image || "",
            email: userEmail as string, // Type assertion to ensure email is string
          },
        });

        console.log("New profile created:", newProfile);
      } else {
        console.log(`Profile already exists for user ID: ${user.id}`);
      }

      return true;
    },
    async session({ session, token, user }) {
      if (session?.user) {
        session.user.id = token.sub || '';
      }
      return session;
    },
    async jwt({ user, token }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
});
