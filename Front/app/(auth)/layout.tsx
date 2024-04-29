// /Front\app\(auth)\layout.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

// https://nextjs.org/docs/app/api-reference/functions/use-pathname

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = usePathname();
  const isRegister = router === "/register";

  return (
    <div className="background-container">
      <div className="auth-container">
        <div className="rounded-icon">
          <FaUser className="text-white w-[42px] h-[48px]" />
        </div>
        <text className="text-black text-4xl font-bold mb-7">
          {isRegister ? "Register" : "Sign In"}
        </text>
        <Link href="#">
          <div className="google-link">
            <div className="grid place-items-center w-7 h-7 bg-white rounded-full">
              <FcGoogle className="text-white w-6 h-6" />
            </div>
            <text className="font-semibold text-white text-base tracking-wide">
              Continue with Google
            </text>
          </div>
        </Link>
        <div className="flex flex-row justify-between items-center w-[252px] h-10 mb-3">
          <div className="w-7 border-t border-gray-300" />
          <text className="text-xs">
            Or {isRegister ? "register" : "sign in"} with username/email
          </text>
          <div className="w-7 border-t border-gray-300" />
        </div>
        {/* This is where the AuthForm are rendered */}
        {children}
        <div className="flex justify-center items-center w-full my-4">
          <p className="text-sm italic text-gray-400 pr-1">
            {isRegister ? "Already" : "Dont"} have an account?
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
  );
};

export default Layout;
