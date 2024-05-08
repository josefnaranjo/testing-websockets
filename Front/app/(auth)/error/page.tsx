"use client";
import React from "react";
import { useRouter } from "next/navigation";

const AuthErrorPage = () => {
  const router = useRouter(); // For redirecting the user to the login page

  const handleRedirect = () => {
    router.push("/signin");
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-200 to-green-400">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-sm w-full">
        <div className="text-green-600 text-5xl mb-4">⚠️</div>{" "}
        {/* Error icon */}
        <h1 className="text-3xl font-bold text-green-800 mb-4">
          Authentication Error
        </h1>
        <p className="text-green-700 mb-6">Please try logging in again.</p>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
          onClick={handleRedirect}
        >
          Go to Login Page
        </button>
      </div>
    </div>
  );
};

export default AuthErrorPage;
