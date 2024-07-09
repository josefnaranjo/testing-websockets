import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons for visibility toggle

interface Props {
  label?: string;
  type: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly?: boolean; // Add readOnly prop
}

const SettingInputField = ({ type, label, value, onChange, name, placeholder, readOnly }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-row justify-between items-center whitespace-nowrap my-3 select-none w-full">
      <h1 className="text-lg font-semibold" style={{ width: '150px' }}>{label}</h1>
      <div className="flex items-center w-full">
        <input
          ref={inputRef}
          type={isPasswordVisible ? "text" : type}
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className="bg-transparent text-lg outline-none font-medium hover:cursor-pointer focus:cursor-default pl-2 placeholder-green-600 w-full hover:bg-green-300 transition-all duration-100 ease-linear rounded-md"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="ml-2"
          >
            {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default SettingInputField;