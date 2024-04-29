import "./MessageNav.css";
import { LuAtSign } from "react-icons/lu";
import { FiPaperclip } from "react-icons/fi";

interface Props {
  channelName: string;
}

const MessageNav: React.FC<Props> = ({ channelName }: Props) => {
  return (
    <nav className="message-navbar">
      <h1 className="channel-name">{channelName}</h1>
      <div className="nav-icons-container">
        <FiPaperclip className="nav-icon" />
        <LuAtSign className="nav-icon" />
      </div>
    </nav>
  );
}

export default MessageNav;
