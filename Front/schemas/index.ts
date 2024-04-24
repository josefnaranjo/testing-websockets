//Validation for the front and backend
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: z.string().min(6, {
      message: "Must be at least 6 characters",
    }),
    confirmPassword: z.string().min(6, {
      message: "Must be at least 6 characters",
    }),
  })
  .superRefine((data, context) => {
    if (data.password !== data.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });
