"use client";

import { login } from "@/actions/auth";
import { LoginSchema } from "@/schemas";
import { FaRegUser } from "react-icons/fa6";
import { LuKeyRound } from "react-icons/lu";
import AuthForm from "./AuthForm";

export default function LoginForm() {
  const formFields = [
    { name: "email", placeholder: "Email", type: "email", Icon: FaRegUser },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
      Icon: LuKeyRound,
    },
  ];

  return (
    <AuthForm
      schema={LoginSchema}
      onSubmitAction={login}
      formFields={formFields}
    />
  );
}
