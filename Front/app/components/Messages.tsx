import Image, { StaticImageData } from "next/image";
import { BiTrashAlt } from "react-icons/bi";
import { TbMoodSmile, TbPencil } from "react-icons/tb";
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

function UserMessages({ img, name, messages }: Props) {
  return (
    <div className="message-entry-container">
      <Image
        src={img}
        quality={100}
        style={{
          maxWidth: "43px",
          maxHeight: "43px",
          objectFit: "contain",
          borderRadius: "50%",
        }}
        alt="prof-pic"
      />

      <div className="userinfo-message-container">
        <div className="userinfo-container">
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
                <TbPencil className="edit-icon" />
                <TbMoodSmile className="edit-icon" />
                <BiTrashAlt className="edit-icon" style={{ color: "red" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserMessages;
