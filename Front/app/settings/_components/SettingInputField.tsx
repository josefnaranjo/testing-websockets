import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons for visibility toggle

interface Props {
  label?: string;
  type: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SettingInputField = ({ type, label, value, onChange, name }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // For adjusting input width based on content
  const adjustInputWidth = () => {
    if (inputRef.current) {
      const span = document.createElement("span");
      span.style.visibility = "hidden";
      span.style.position = "absolute";
      span.style.height = "auto";
      span.style.width = "auto";
      span.style.whiteSpace = "nowrap";
      span.textContent = value;

      // Copy font styles from input to span
      const computedStyle = window.getComputedStyle(inputRef.current);
      span.style.fontSize = computedStyle.fontSize;
      span.style.fontFamily = computedStyle.fontFamily;
      span.style.fontWeight = computedStyle.fontWeight;
      span.style.letterSpacing = computedStyle.letterSpacing;

      document.body.appendChild(span);
      const spanWidth = span.offsetWidth;
      document.body.removeChild(span);

      inputRef.current.style.width = `${spanWidth + 20}px`; // +20 for padding
    }
  };

  // Adjust input width on initial render
  useEffect(() => {
    adjustInputWidth();
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-row justify-between items-center whitespace-nowrap my-3 select-none">
      <h1 className="text-lg font-semibold">{label}</h1>
      <div className="flex items-center hover:bg-green-300
                      transition-all duration-100 ease-linear
                      rounded-md">
        <input
          ref={inputRef}
          type={isPasswordVisible ? "text" : type}
          name={name}
          value={value || ""}
          onChange={onChange}
          className="bg-transparent text-lg outline-gray-400 font-medium hover:cursor-pointer focus:cursor-default pl-2"
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
