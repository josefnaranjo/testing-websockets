import React, { useEffect, useState } from "react";
import MessageInput from "./components/message-column/MessageInput";
import MessageNav from "./components/message-column/MessageNav";
import UserMessages from "./components/message-column/Messages";
import user from "../public/user.png";
import axios from "axios";


const MessageLog: React.FC = () => {
  // State to manage messages
  const [userMessages, setUserMessages] = useState<any[]>([
    {
      name: "Orchid",
      img: user,
      messages: [],
    }
  ]);

  // Function to handle sending messages
  const sendMessage = (message: string) => {
    // send message to api along with channel it is for and your token.
    // NOTE replace REDUX.user.name with whatever method is used to fetch user's ID
    const copyUserMessages = [...userMessages];
    if (copyUserMessages[copyUserMessages.length -1].userID == 3) {
      copyUserMessages[copyUserMessages.length -1].messages.push({
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        text: message,
      });
    } else {
      copyUserMessages.push({
        name: 'Orchid',
        img: user,
        userID: 3,
        messages: [{
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          text: message,
        }]
      });
    }
    setUserMessages(copyUserMessages);
  };

  // Make User Messages from channelMessages TODO:: make a type for message objects ;)
  const convertToUserMessages = (messages: Array<any>): any[] => {
    const convertedUserMessages: any[] = [];
    // {img: some image, messages: [], name: string}
    let lastUserID: number = 0;
    let currentUserMessage: any = {
      name: 'yoink',
      messages: [],
      img: null,
      userID: 0
    };
    console.log(messages);
    messages.forEach(message => {
      if (message.userID === lastUserID) {
        currentUserMessage.messages.push(convertMessageBody(message));
        return;
      }
      if (lastUserID !== 0) {
        convertedUserMessages.push(currentUserMessage);
      }
      currentUserMessage = {
        name: message.userID,
        userID: message.userID,
        messages: [convertMessageBody(message)],
        img: null
      };
      lastUserID = message.userID;
    });
    convertedUserMessages.push(currentUserMessage);
    return convertedUserMessages;
  };

  const convertMessageBody = (message: any) => {
    return {
      time: 'created at ' + message.createdTS,
      text: message.messageContent
    }
  }

  const channelId = 1;
 
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/directMessages?id=" + channelId + "&createdTS=0" )
      .then((res) => {
        setUserMessages(convertToUserMessages(res.data))
      })
      .catch(err => {
        console.log(err, err.response);
      })
  }, []);

  return (
    <>
      <MessageNav channelName="Conspiracies" />
      <div className="flex flex-col justify-between h-full">
        <div className="overflow-auto flex-grow max-h-[720px]">
          {userMessages.map((userMessage, index) => (
            <UserMessages
              key={index}
              img={userMessage.img}
              name={userMessage.name}
              messages={userMessage.messages} // [{time: string, text: string}, ...]
            />
          ))}
        </div>
        <MessageInput onSendMessage={sendMessage} />
      </div>
    </>
  );
};

export default MessageLog;
