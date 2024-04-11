'use client';

import Link from 'next/link';
import { FaRegUser, FaUser } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { LuKeyRound } from 'react-icons/lu';
import './signin.css';

export default function SignIn() {
  return (
    <div className="background-container">
      <div className="auth-container">
        <div className="rounded-icon">
          <FaUser className="text-white w-[42px] h-[48px]" />
        </div>

        <text className="text-black text-4xl font-extrabold mb-7">Sign In</text>

        <Link href="#" className="google-link">
          <div className="grid place-items-center w-7 h-7 bg-white rounded-full">
            <FcGoogle className="text-white w-6 h-6" />
          </div>
          <text className="font-semibold text-white text-base tracking-wide">Continue with Google</text>
        </Link>

        <div className="flex flex-row justify-between items-center w-[252px] h-10 mb-3">
          <div className="w-7 border-t border-gray-300" />
          <text className="text-xs">Or continue with username/email</text>
          <div className="w-7 border-t border-gray-300" />
        </div>

        <form className="flex flex-col justify-center items-center">
          <div className="space-y-4">
            <div className="relative group">
              <input placeholder="Email" type="email" id="email" className="border border-gray-200 rounded-md pl-3 pr-10 w-[252px] h-10 outline-gray-400" />

              <FaRegUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:opacity-0 transition-opacity duration-250" />
            </div>

            <div className="relative group">
              <input placeholder="Password" type="password" id="password" className="border border-gray-200 rounded-md pl-3 pr-10 w-[252px] h-10 outline-gray-400" />

              <LuKeyRound className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:opacity-0 transition-opacity duration-250" />
            </div>
          </div>

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

          <button type="submit" className="w-[252px] h-10 bg-emerald-500 text-white text-lg font-medium rounded-md mt-4 ">
            Login
          </button>

          <div className="flex justify-center items-center w-full mt-4">
            <p className="text-sm italic text-gray-400 pr-1">Dont have an account?</p>
            <Link href="/register" className="text-sm underline text-emerald-400 ml-1">
              Register Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
