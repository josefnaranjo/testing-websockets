"use server";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { LoginSchema, RegisterSchema } from "@/schemas";
import bcrypt from "bcrypt";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  // console.log(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  return { success: "Login Success" };
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  // console.log(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User already exists" };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // TODO: Send verification email

  return { success: "Register Success" };
};
