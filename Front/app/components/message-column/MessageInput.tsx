import React, { useState, FormEvent, ChangeEvent, useEffect, KeyboardEvent } from "react";
import { FiPaperclip } from "react-icons/fi";
import { LuSend } from "react-icons/lu";
import { TbMoodSmile } from "react-icons/tb";
import "./MessageInput.css";

interface Props {
  onSendMessage: (message: string) => void;
}


const MessageInput: React.FC<Props> = ({ onSendMessage }) => {
  const [typedMessage, setTypedMessage] = useState<string>("");

  const handleSubmit = ( e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault(); 
    if (typedMessage.trim() !== "") {
      onSendMessage(typedMessage);
      setTypedMessage("");
      console.log("Message sent", typedMessage);
    }
  }

  useEffect(() => {
    const keyDownHandler = (e: any )  => {
      if (e && e.key) {
        console.log("user pressed" + e.key);
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit(e);
      }
    }
  
    document.addEventListener('keydown', keyDownHandler)
  
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  });

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTypedMessage(e.target.value);
  };


  return (
    <div className="input-container">
      <form className="entry-and-submit" onSubmit={handleSubmit}>
        <textarea
          id="typed-message"
          placeholder="Type Message..."
          value={typedMessage}
          onChange={handleInputChange}
        />
        <div className="submit-button">
          <button type="submit">
            <LuSend
              style={{ width: "21px", height: "21px" }}
              className="send-icon"
            />
          </button>
        </div>
      </form>
      <div className="message-features">
        <div className="input-icons-container">
          <FiPaperclip className="input-icon" />
          <TbMoodSmile className="input-icon" />
        </div>
      </div>
    </div>
  );
};

export default MessageInput;




