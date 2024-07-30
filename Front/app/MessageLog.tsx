"use client";

import React, { useEffect, useState, useRef } from "react";
import MessageInput from "./components/message-column/MessageInput";
import MessageNav from "./components/message-column/MessageNav";
import ExistingUserMessages from "./components/message-column/Messages";
import axios from "axios";
import { currentUser } from "@/lib/current-user";
import useWebSocket from "@/app/useWebSocket";

interface Message {
  id: string;
  createdAt: string;
  text: string;
  displayTime: string;
  userId: string;
  userName: string;
  userImage: string | null;
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
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [selectedChannelName, setSelectedChannelName] =
    useState<string>(channelName);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(
    null
  );
  const socket = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Reference for the end of the messages

  const defaultAvatar =
    "https://res.cloudinary.com/demo/image/upload/sample.jpg";

  const { messages: webSocketMessages, sendMessage } = useWebSocket(
    "ws://localhost:8080"
  );

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await currentUser();
      if (user) {
        setCurrentUserId(user.id);
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
          const messages = await Promise.all(
            channel.messages.map(async (msg: any) => {
              const userResponse = await axios.get(`/api/user/${msg.userId}`);
              const user = userResponse.data;
              return convertMessageBody({ ...msg, user });
            })
          );
          setUserMessages(messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [channelId, userId, channelName]);

  useEffect(() => {
    if (webSocketMessages.length) {
      setUserMessages((prevMessages) => {
        const newMessages = webSocketMessages.map((msg) =>
          convertMessageBody(msg)
        );
        const allMessages = [...prevMessages, ...newMessages];
        allMessages.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        return allMessages;
      });
    }
  }, [webSocketMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [userMessages]);

  const handleMessageSend = async (message: string): Promise<void> => {
    try {
      const userId = currentUserId;

      if (selectedChannelId) {
        const newMessage = {
          content: message,
          channelId: selectedChannelId,
          userId,
        };
        sendMessage(newMessage);
      } else if (userId) {
        const newMessage = {
          content: message,
          channelId: null,
          userId,
        };
        sendMessage(newMessage);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const deleteMessage = async (messageId: string): Promise<void> => {
    try {
      await axios.delete(`/api/messages/${messageId}`);
      deleteMessageFromState(messageId);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const deleteMessageFromState = (messageId: string) => {
    setUserMessages((prevMessages) =>
      prevMessages.filter((msg) => msg.id !== messageId)
    );
  };

  const convertMessageBody = (message: any): Message => {
    const date = new Date(message.createdAt);
    const localTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return {
      id: message.id,
      createdAt: message.createdAt, // Keep the original timestamp for sorting
      text: message.content,
      displayTime: localTime, // Human-readable format
      userId: message.userId,
      userName: message.user.name,
      userImage: message.user.image || defaultAvatar,
    };
  };

  return (
    <>
      <MessageNav
        channelName={selectedChannelName}
        channelId={selectedChannelId}
      />
      <div className="flex flex-col justify-between h-full">
        <div className="overflow-auto flex-grow max-h-[720px]">
          {userMessages.map((message, index) => (
            <ExistingUserMessages
              key={index}
              img={message.userImage || defaultAvatar}
              name={message.userName}
              userID={message.userId}
              messages={[message]}
              onDeleteMessage={deleteMessage}
              currentUserId={currentUserId} // Pass the currentUserId to ExistingUserMessages
            />
          ))}
          <div ref={messagesEndRef} />{" "}
          {/* This div will be scrolled into view */}
        </div>
        <MessageInput onSendMessage={handleMessageSend} />
      </div>
    </>
  );
};

export default MessageLog;
