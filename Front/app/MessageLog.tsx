"use client";

import React, { useEffect, useState } from "react";
import MessageInput from "./components/message-column/MessageInput";
import MessageNav from "./components/message-column/MessageNav";
import ExistingUserMessages from "./components/message-column/Messages";
import axios from "axios";
import { currentUser } from "@/lib/current-user";

interface Message {
  time: string;
  text: string;
  id: string;
}

interface NEWUserMessage {
  name: string;
  img: string | null;
  userID: string;
  messages: Message[];
}

interface MessageLogProps {
  channelName: string;
  channelId: string;
  userId: string;
}

const MessageLog = ({ channelName, channelId, userId }: MessageLogProps) => {
  const [userMessages, setUserMessages] = useState<NEWUserMessage[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [selectedChannelName, setSelectedChannelName] = useState<string>(channelName);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);

  const defaultAvatar = "https://res.cloudinary.com/demo/image/upload/sample.jpg"; // Example fallback URL from Cloudinary

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await currentUser();
      if (user) {
        setCurrentUserId(user.id);
        console.log("Current user ID set to:", user.id); // Log currentUserId after setting it
      } else {
        console.error("User is not authenticated");
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setUserMessages([]); // Reset messages when channel or user changes

        if (channelId) {
          setSelectedChannelId(channelId);
          setSelectedChannelName(channelName);

          const response = await axios.get(`/api/channels/${channelId}`);
          const channel = response.data;
          const messages = channel.messages;
          setUserMessages(await convertToUserMessages(messages));
        } else if (userId) {
          setSelectedChannelId(null);
          setSelectedChannelName("Direct Messages");

          const response = await axios.get(`/api/messages/${userId}`);
          const messages = response.data;
          setUserMessages(await convertToUserMessages(messages));
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [channelId, userId, channelName]);

  const createNewMessage = async (content: string, channelId: string | null, userId: string): Promise<string | null> => {
    const user = await currentUser();

    if (!user) {
      console.error("Unauthorized access");
      return null;
    }

    try {
      const response = await fetch('/api/directMessages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, channelId, userId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Message created:', data);
        return data.id;
      } else {
        const errorData = await response.json();
        console.error('Failed to create message:', errorData);
        return null;
      }
    } catch (error) {
      console.error("Failed to create message:", error);
      return null;
    }
  };

  const sendMessage = async (message: string): Promise<void> => {
    try {
      const userId = currentUserId;

      if (selectedChannelId) {
        const messageId = await createNewMessage(message, selectedChannelId, userId);
        if (messageId != null) {
          updateLocalMessages(userId, message, messageId);
        }
      } else if (userId) {
        const messageId = await createNewMessage(message, null, userId);
        if (messageId != null) {
          updateLocalMessages(userId, message, messageId);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const updateLocalMessages = (userId: string, message: string, messageId: string) => {
    const copyNewUserMessages = [...userMessages];
    if (copyNewUserMessages.length > 0 && copyNewUserMessages[copyNewUserMessages.length - 1].userID === userId) {
      copyNewUserMessages[copyNewUserMessages.length - 1].messages.push({
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: message,
        id: messageId,
      });
    } else {
      copyNewUserMessages.push({
        name: "You",
        img: defaultAvatar,
        userID: userId,
        messages: [{
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: message,
          id: messageId,
        }],
      });
    }
    setUserMessages(copyNewUserMessages);
  };

  const convertToUserMessages = async (messages: Array<any>): Promise<NEWUserMessage[]> => {
    const convertedUserMessages: NEWUserMessage[] = [];
    let lastUserID: string = "";
    let currentUserMessage: NEWUserMessage = {
      name: "User",
      messages: [],
      img: null,
      userID: "",
    };

    for (const message of messages) {
      if (message.userId === lastUserID) {
        currentUserMessage.messages.push(convertMessageBody(message));
        continue;
      }
      if (lastUserID !== "") {
        convertedUserMessages.push(currentUserMessage);
      }
      const userResponse = await axios.get(`/api/user/${message.userId}`);
      const user = userResponse.data;
      currentUserMessage = {
        name: user.name || "User",
        userID: message.userId,
        messages: [convertMessageBody(message)],
        img: user.image || defaultAvatar,
      };
      lastUserID = message.userId;
    }

    if (currentUserMessage.messages.length > 0) {
      convertedUserMessages.push(currentUserMessage);
    }
    return convertedUserMessages;
  };

  const convertMessageBody = (message: any): Message => {
    const date = new Date(message.createdAt);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

    return {
      time: formattedTime,
      text: message.content,
      id: message.id,
    };
  };

  return (
    <>
      <MessageNav channelName={selectedChannelName} channelId={selectedChannelId} />
      <div className="flex flex-col justify-between h-full">
        <div className="overflow-auto flex-grow max-h-[720px]">
          {userMessages.map((userMessage, index) => (
            <ExistingUserMessages
              key={index}
              img={userMessage.img || defaultAvatar}
              name={userMessage.name}
              userID={userMessage.userID} // Ensure userID is passed
              messages={userMessage.messages}
            />
          ))}
        </div>
        <MessageInput onSendMessage={sendMessage} />
      </div>
    </>
  );
};

export default MessageLog;
