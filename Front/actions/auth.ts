"use server";
import { LoginSchema, RegisterSchema } from "@/schemas";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  console.log(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  return { success: "Login Success" };
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  console.log(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  return { success: "Register Success" };
};
