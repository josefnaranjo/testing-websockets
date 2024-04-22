import React from "react";
import { RxCheckCircled } from "react-icons/rx";

interface FormSuccessProps {
  message?: string;
}

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center justify-center bg-[#DCF1EA] w-[252px] h-10 rounded-md gap-x-2 mt-4">
      <RxCheckCircled size={18} className="text-emerald-500 mt-[2px]" />
      <p className="text-emerald-500">{message}</p>
    </div>
  );
};

export default FormSuccess;
