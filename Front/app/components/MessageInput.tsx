"use client";

import React from "react";
import { FiPaperclip } from "react-icons/fi";
import { LuSend } from "react-icons/lu";
import { TbMoodSmile} from "react-icons/tb";
import "./MessageInput.css";

const MessageInput = () => {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("clicked");
  }

  return (
    <div>
      <div className="input-container">
        <form className="entry-and-submit" onSubmit={handleSubmit}>
          <textarea id="message-input" placeholder="Type Message..."></textarea>
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
    </div>
  );
};

export default MessageInput;
