"use client";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

type isAuthType = "/register" | "/signin";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname(); // Use `pathname` instead of `router`
  const isRegister = pathname === "/register";
  const isAuthPage = (["/register", "/signin"] as isAuthType[]).includes(
    pathname as isAuthType
  );

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  // Directly return the conditional JSX
  return isAuthPage ? (
    <div className="background-container">
      <div className="auth-container">
        <div className="rounded-icon">
          <FaUser className="text-white w-[42px] h-[48px]" />
        </div>
        <h1 className="text-black text-4xl font-bold mb-7">
          {isRegister ? "Register" : "Sign In"}
        </h1>
        <button onClick={() => onClick("google")}>
          <div className="google-link">
            <div className="grid place-items-center w-7 h-7 bg-white rounded-full">
              <FcGoogle className="text-white w-6 h-6" />
            </div>
            <span className="font-semibold text-white text-base tracking-wide">
              Continue with Google
            </span>
          </div>
        </button>
        <div className="flex flex-row justify-between items-center w-[252px] h-10 mb-3">
          <div className="w-7 border-t border-gray-300" />
          <span className="text-xs">
            Or {isRegister ? "register" : "sign in"} with username/email
          </span>
          <div className="w-7 border-t border-gray-300" />
        </div>
        {/* This is where the AuthForm is rendered */}
        {children}
        <div className="flex justify-center items-center w-full my-4">
          <p className="text-sm italic text-gray-400 pr-1">
            {isRegister ? "Already" : "Don't"} have an account?
          </p>
          <Link
            href={isRegister ? "/signin" : "/register"}
            className="text-sm underline text-emerald-400 ml-1"
          >
            {isRegister ? "Login" : "Register"} Here
          </Link>
        </div>
      </div>
    </div>
  ) : (
    children
  );
};

export default Layout;
