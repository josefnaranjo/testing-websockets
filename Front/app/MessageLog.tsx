"use client";

import React, { useEffect, useState, useRef } from "react";
import MessageInput from "./components/message-column/MessageInput";
import MessageNav from "./components/message-column/MessageNav";
import ExistingUserMessages from "./components/message-column/Messages";
import axios from "axios";
import { currentUser } from "@/lib/current-user";
import usePusher from "./usePusher";

interface Message {
  id: string;
  createdAt: string;
  text: string;
  displayTime: string;
  userId: string;
  userName: string;
  userImage: string | null;
}

interface NewMessage {
  content: string;
  channelId: string;
  userId: string;
}

interface MessageLogProps {
  channelName: string;
  channelId: string;
  userId: string;
}

const MessageLog = ({ channelName, channelId, userId }: MessageLogProps) => {
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [currentUserName, setCurrentUserName] = useState<string>("Anonymous");
  const [currentUserImage, setCurrentUserImage] = useState<string | null>(null);
  const [selectedChannelName, setSelectedChannelName] =
    useState<string>(channelName);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(
    null
  );
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const defaultAvatar =
    "https://res.cloudinary.com/demo/image/upload/sample.jpg";

  // Use Pusher for real-time updates
  const { messages: pusherMessages, sendMessage } = usePusher(
    channelName,
    "new-message"
  );

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await currentUser();
      if (user) {
        setCurrentUserId(user.id);
        setCurrentUserName(user.name || "Anonymous");
        setCurrentUserImage(user.image || defaultAvatar);
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

          const response = await axios.get(
            `/api/directMessages?id=${channelId}`
          );
          const channelMessages = response.data;
          const messages = channelMessages.map((msg: any) => {
            return convertMessageBody(msg);
          });
          setUserMessages(messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [channelId, userId, channelName]);

  useEffect(() => {
    if (pusherMessages.length) {
      setUserMessages((prevMessages) => {
        const newMessages = pusherMessages.map((msg) =>
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
  }, [pusherMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [userMessages]);

  const handleMessageSend = async (content: string): Promise<void> => {
    try {
      if (selectedChannelId && currentUserId) {
        const newMessage: NewMessage = {
          content,
          channelId: selectedChannelId,
          userId: currentUserId,
        };

        // Attach user name and image to message
        const messageWithUserData = {
          ...newMessage,
          userName: currentUserName,
          userImage: currentUserImage,
        };

        sendMessage(messageWithUserData);
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
    const localTime = !isNaN(date.getTime())
      ? date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "Invalid Date";

    return {
      id: message.id,
      createdAt: message.createdAt,
      text: message.content,
      displayTime: localTime,
      userId: message.userId,
      userName: message.user?.name || "Anonymous",
      userImage: message.user?.image || defaultAvatar,
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
              currentUserId={currentUserId}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <MessageInput onSendMessage={handleMessageSend} />
      </div>
    </>
  );
};

export default MessageLog;
