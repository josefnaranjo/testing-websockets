import Image from "next/image";
import { BiTrashAlt } from "react-icons/bi";
import { TbMoodSmile, TbPencil } from "react-icons/tb";
import React, { useState } from "react";
import "./Messages.css";

interface Message {
  id: string;
  text: string;
  displayTime: string;
}

interface Props {
  img: string; // Adjust to accept a string URL for the image
  name: string;
  userID: string; // Ensure userID prop is defined
  messages: Message[];
  onDeleteMessage: (messageId: string) => void; // Add onDeleteMessage prop
  currentUserId: string; // Add currentUserId to check ownership
}

const UserMessages: React.FC<Props> = ({
  img,
  name,
  userID,
  messages,
  onDeleteMessage,
  currentUserId, // Add currentUserId to check ownership
}) => {
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);

  function displayUserInfo() {
    console.log("displayUserInfo clicked");
  }

  function deleteMessage(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    messageId: string
  ) {
    event.stopPropagation(); // Prevent triggering other events
    onDeleteMessage(messageId);
  }

  function handleMouseEnter(messageId: string) {
    setHoveredMessageId(messageId);
  }

  function handleMouseLeave() {
    setHoveredMessageId(null);
  }

  return (
    <div className="message-entry-container">
      <div className="userinfo-message-container">
        <div className="userinfo-container" onClick={displayUserInfo}>
          {img && (
            <Image
              src={img}
              quality={100}
              width={43}
              height={43}
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
            <div className="time-entry">{messages[0].displayTime}</div>
          )}
        </div>
        <div className="message-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className="text-message"
              onMouseEnter={() => handleMouseEnter(message.id)}
              onMouseLeave={handleMouseLeave}
            >
              {index !== 0 && (
                <div className="time-entry time-entry-side">
                  {message.displayTime}
                </div>
              )}
              {message.text}
              <div className="edit-box">
                {hoveredMessageId === message.id && (
                  <>
                    <button id="react-smile">
                      <TbMoodSmile className="edit-icon" />
                    </button>
                    {userID === currentUserId && (
                      <>
                        <button id="edit-pencil">
                          <TbPencil className="edit-icon" />
                        </button>
                        <button
                          id="delete-trash"
                          onClick={(event) => deleteMessage(event, message.id)}
                        >
                          <BiTrashAlt
                            className="edit-icon"
                            style={{ color: "red" }}
                          />
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserMessages;
