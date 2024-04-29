"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { IconType } from "react-icons";
import { z } from "zod";
import "./AuthForm.css";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import InputType from "./InputType";
import { useRouter } from "next/navigation";

interface FormField {
  name: string;
  placeholder: string;
  type: string;
  Icon: IconType;
  defaultValue?: string;
}

interface AuthFormProps {
  schema: z.ZodType<any>;
  onSubmitAction: (values: any) => Promise<any>;
  formFields: FormField[];
}

export default function AuthForm({
  schema,
  onSubmitAction,
  formFields,
}: AuthFormProps) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    // mode: "onSubmit", // Validate only on submit (NOT WORKING)
    defaultValues: formFields.reduce((acc: Record<string, any>, field) => {
      acc[field.name] = field.defaultValue || "";
      return acc;
    }, {}),
  });

  const onSubmit = (values: Record<string, any>) => {
    setError(""); // Clear errors initially
    setSuccess("");

    // Ensure default behavior is prevented
    startTransition(() => {
      onSubmitAction(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setSuccess(data.success);
            router.push("/");
            router.refresh();
          }
        })
        .catch((error) => {
          console.error("Error during submission:", error);
          setError("An error occurred");
        });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center"
    >
      <div className="space-y-4">
        {formFields.map((field) => (
          <div key={field.name}>
            <Controller
              name={field.name}
              control={control}
              render={({ field: fieldProps }) => (
                <InputType
                  {...fieldProps}
                  placeholder={field.placeholder}
                  type={field.type}
                  id={field.name}
                  Icon={field.Icon}
                  disabled={isPending}
                />
              )}
            />
            {errors[field.name] && (
              <span className="text-red-500 text-sm">
                {errors[field.name]?.message as string}
              </span>
            )}
          </div>
        ))}
      </div>

      {!(formFields.length > 2) && (
        <div className="flex justify-between items-center w-full mt-4">
          <div className="flex justify-center items-center">
            <input type="checkbox" id="remember" className="mr-1" />
            <label htmlFor="remember" className="text-sm text-gray-400">
              Remember me
            </label>
          </div>
          <a href="#" className="text-sm text-emerald-400">
            Forgot password?
          </a>
        </div>
      )}

      <FormError message={error} />
      <FormSuccess message={success} />

      <button
        type="submit"
        className="w-[252px] h-10 bg-emerald-500 text-white text-lg font-medium rounded-md mt-4"
        disabled={isPending}
      >
        {formFields.length > 2 ? "Create Account" : "Login"}
      </button>
    </form>
  );
}
