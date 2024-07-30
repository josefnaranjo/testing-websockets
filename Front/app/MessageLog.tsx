import React, { useEffect, useState } from "react";
import MessageInput from "./components/message-column/MessageInput";
import MessageNav from "./components/message-column/MessageNav";
import UserMessages from "./components/message-column/Messages";
import axios from "axios";
import { useSession } from "next-auth/react";
import useWebSocket from "./useWebSocket";
import Image from 'next/image';

const MessageLog: React.FC = () => {
  const { data: session } = useSession();
  const { messages, sendMessage } = useWebSocket('ws://localhost:8080');
  const [userMessages, setUserMessages] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Fetch current user details
  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user?.id) {
        const response = await axios.get(`/api/user/${session.user.id}`);
        const user = response.data;
        setCurrentUser(user);
      }
    };
    fetchUser();
  }, [session]);

  // Update userMessages state when new messages arrive
  useEffect(() => {
    const updatedUserMessages = convertToUserMessages(messages);
    setUserMessages(updatedUserMessages);
  }, [messages]);

  // Function to handle sending messages
  const handleSendMessage = (message: string) => {
    if (!currentUser) return;
    const newMessage = {
      channelId: 1,
      content: message,
      userId: currentUser.id // Include user ID in the message
    };
    sendMessage(newMessage);
  };

  // Convert received messages to user messages format
  const convertToUserMessages = (messages: any[]): any[] => {
    const convertedUserMessages: any[] = [];
    let lastUserID: string = '';
    let currentUserMessage: any = {
      name: '',
      messages: [],
      img: null,
      userID: ''
    };

    messages.forEach(message => {
      if (message.userId === lastUserID) {
        currentUserMessage.messages.push(convertMessageBody(message));
        return;
      }
      if (lastUserID !== '') {
        convertedUserMessages.push(currentUserMessage);
      }
      currentUserMessage = {
        name: message.user.name,
        userID: message.userId,
        messages: [convertMessageBody(message)],
        img: message.user.image || '/user.png' // Check if user image is available
      };
      lastUserID = message.userId;
    });

    if (currentUserMessage.userID !== '') {
      convertedUserMessages.push(currentUserMessage);
    }

    return convertedUserMessages;
  };

  const convertMessageBody = (message: any) => {
    return {
      time: 'created at ' + message.createdAt,
      text: message.content
    };
  };

  const channelId = 1;

  // Fetch initial messages
  useEffect(() => {
    axios
      .get(`/api/directMessages?id=${channelId}&createdTS=0`)
      .then((res) => {
        setUserMessages(convertToUserMessages(res.data));
      })
      .catch(err => {
        console.log(err);
      });
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
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </>
  );
};

export default MessageLog;
