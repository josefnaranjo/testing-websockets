"use client";

import React, { useEffect, useState, useRef } from "react";
import MessageInput from "./components/message-column/MessageInput";
import MessageNav from "./components/message-column/MessageNav";
import ExistingUserMessages from "./components/message-column/Messages";
import axios from "axios";
import { currentUser } from "@/lib/current-user";

interface Message {
  id: string;
  createdAt: string;
  text: string;
  displayTime: string;
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
  const socket = useRef<WebSocket | null>(null);

  const defaultAvatar = "https://res.cloudinary.com/demo/image/upload/sample.jpg";

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await currentUser();
      if (user) {
        setCurrentUserId(user.id);
        console.log("Current user ID set to:", user.id);
      } else {
        console.error("User is not authenticated");
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setUserMessages([]);

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

  useEffect(() => {
    if (!socket.current) {
      socket.current = new WebSocket("ws://localhost:8080");

      socket.current.onopen = () => {
        console.log("WebSocket connected");
      };

      socket.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("WebSocket message received:", message);

        setUserMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const existingUserIndex = updatedMessages.findIndex(
            (userMessage) => userMessage.userID === message.userId
          );

          if (existingUserIndex !== -1) {
            const existingMessageIndex = updatedMessages[existingUserIndex].messages.findIndex(
              (msg) => msg.id === message.id
            );
            if (existingMessageIndex === -1) {
              updatedMessages[existingUserIndex].messages.push(convertMessageBody(message));
            }
          } else {
            updatedMessages.push({
              name: message.user.name,
              img: message.user.image || defaultAvatar,
              userID: message.userId,
              messages: [convertMessageBody(message)],
            });
          }

          // Sort messages by timestamp to ensure correct order
          updatedMessages.forEach(userMessage => {
            userMessage.messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          });

          return updatedMessages;
        });
      };

      socket.current.onclose = () => {
        console.log("WebSocket disconnected");
      };

      socket.current.onerror = (error) => {
        console.error("WebSocket error", error);
      };
    }

    return () => {
      if (socket.current) {
        socket.current.close();
        socket.current = null;
      }
    };
  }, [currentUserId]);

  const sendMessage = async (message: string): Promise<void> => {
    try {
      const userId = currentUserId;

      if (selectedChannelId) {
        const newMessage = {
          content: message,
          channelId: selectedChannelId,
          userId,
        };

        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
          socket.current.send(JSON.stringify(newMessage));
        } else {
          console.error("WebSocket is not connected");
        }
      } else if (userId) {
        const newMessage = {
          content: message,
          channelId: null,
          userId,
        };

        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
          socket.current.send(JSON.stringify(newMessage));
        } else {
          console.error("WebSocket is not connected");
        }
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
      prevMessages
        .map(userMessage => ({
          ...userMessage,
          messages: userMessage.messages.filter(msg => msg.id !== messageId),
        }))
        .filter(userMessage => userMessage.messages.length > 0)
    );
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
    const localTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    return {
      id: message.id,
      createdAt: message.createdAt, // Keep the original timestamp for sorting
      text: message.content,
      displayTime: localTime // Human-readable format
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
              userID={userMessage.userID}
              messages={userMessage.messages}
              onDeleteMessage={deleteMessage}
            />
          ))}
        </div>
        <MessageInput onSendMessage={sendMessage} />
      </div>
    </>
  );
};

export default MessageLog;
