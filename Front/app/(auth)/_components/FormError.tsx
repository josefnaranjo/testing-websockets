import React from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center justify-center bg-[#FDE6E7] w-[252px] h-10 rounded-md gap-x-2 mt-4">
      <HiOutlineExclamationTriangle
        size={18}
        className="text-red-600 mt-[2px]"
      />
      <p className="text-red-600">{message}</p>
    </div>
  );
};

export default FormError;
