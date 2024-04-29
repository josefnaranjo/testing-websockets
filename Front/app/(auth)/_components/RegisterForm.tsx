"use client";

import { register } from "@/actions/auth";
import { RegisterSchema } from "@/schemas";
import { FaRegUser } from "react-icons/fa6";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { LuKeyRound } from "react-icons/lu";
import AuthForm from "./AuthForm";

export default function RegisterForm() {
  const formFields = [
    { name: "email", placeholder: "Email", type: "email", Icon: FaRegUser },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
      Icon: LuKeyRound,
    },
    {
      name: "confirmPassword",
      placeholder: "Confirm Password",
      type: "password",
      Icon: IoCheckmarkCircleOutline,
    },
  ];

  return (
    <AuthForm
      schema={RegisterSchema}
      onSubmitAction={register}
      formFields={formFields}
    />
  );
}
