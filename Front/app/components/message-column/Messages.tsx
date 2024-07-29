import Image from "next/image";
import { BiTrashAlt } from "react-icons/bi";
import { TbMoodSmile, TbPencil } from "react-icons/tb";
import React from "react";
import "./Messages.css";

interface Message {
  time: string;
  text: string;
}

interface Props {
  img: string; // Adjust to accept a string URL for the image
  name: string;
  userID: string; // Ensure userID prop is defined
  messages: Message[];
}

const UserMessages: React.FC<Props> = ({ img, name, userID, messages }) => {
  function displayUserInfo() {
    console.log('displayUserInfo clicked');
  }

  function deleteMessage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const deleteThisMessage = event.currentTarget.closest('.text-message');
    if (deleteThisMessage) {
      deleteThisMessage.remove();
    }
  }

  // Log the received props for debugging
  console.log('UserMessages props:', { img, name, userID, messages });

  return (
    <div className="message-entry-container">
      <div className="userinfo-message-container">
        <div className="userinfo-container" onClick={displayUserInfo}>
          {img && (
            <Image
              src={img}
              quality={100}
              width={43} // Specify width
              height={43} // Specify height
              style={{
                maxWidth: "43px",
                maxHeight: "43px",
                borderRadius: "50%",
              }}
              alt="prof-pic"
            />
          )}
          <div className="username">{name}</div>
          {messages[0] && (
            <div className="time-entry">{messages[0].time}</div>
          )}
        </div>
        <div className="message-container">
          {messages.map((message, index) => (
            <div key={index} className="text-message">
              {index !== 0 && (
                <div className="time-entry time-entry-side">{message.time}</div>
              )}
              {message.text}
              <div className="edit-box">
                <button id="edit-pencil"><TbPencil className="edit-icon" /></button>
                <button id="react-smile"><TbMoodSmile className="edit-icon" /></button>
                <button id="delete-trash" onClick={deleteMessage}>
                  <BiTrashAlt className="edit-icon" style={{ color: "red" }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserMessages;
