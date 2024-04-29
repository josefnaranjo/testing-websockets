import Image, { StaticImageData } from "next/image";
import { BiTrashAlt } from "react-icons/bi";
import { TbMoodSmile, TbPencil } from "react-icons/tb";
import React, { useState, FormEvent, useEffect } from "react";
import "./Messages.css";

interface Message {
  time: string;
  text: string;
}

interface Props {
  img: StaticImageData;
  name: string;
  messages: Message[];
}


const UserMessages: React.FC<Props> = ({ img, name, messages }: Props) => {

  function displayUserInfo () {
    console.log('displayUserInfo clicked');
  }

  function deleteMessage (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const deleteThisMessage = event.currentTarget.closest('.text-message');
    if (deleteThisMessage) {
      deleteThisMessage.remove();
    }
  }


return (
    <div className='message-entry-container' >
      <div className="userinfo-message-container" >
        <div className="userinfo-container" onClick={displayUserInfo}>
          { img != null &&  (<Image src={img}
                 quality={100}
                 style={{
                    maxWidth: "43px",
                    maxHeight: "43px",
                    borderRadius: "50%",
                 }}
                 alt="prof-pic"
          /> ) }
          <div className="username"> {name} </div>
          {messages[0] && (
            <div className="time-entry"> {messages[0].time} </div>
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