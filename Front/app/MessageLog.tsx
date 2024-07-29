"use client";

import React, { useEffect, useState, useRef } from "react";
import MessageInput from "./components/message-column/MessageInput";
import MessageNav from "./components/message-column/MessageNav";
import ExistingUserMessages from "./components/message-column/Messages";
import axios from "axios";
import { StaticImageData } from "next/image";
import { currentUser } from "@/lib/current-user";

interface Message {
  time: string;
  text: string;
  id: string;
}

interface NEWUserMessage {
  name: string;
  img: string | null; // Adjust to handle image URL as string
  userID: string;
  messages: Message[];
}

interface MessageLogProps {
  channelName: string;
  channelId: string;
}

const MessageLog = ({ channelName, channelId }: MessageLogProps) => {
  const [userMessages, setUserMessages] = useState<NEWUserMessage[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [selectedChannelName, setSelectedChannelName] = useState<string>(channelName);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const socket = useRef<WebSocket | null>(null);

  const defaultAvatar = "https://res.cloudinary.com/demo/image/upload/sample.jpg"; // Example fallback URL from Cloudinary

  const channelIDTemplate = `${channelId}`;
  const channelNameTemplate = `${channelName}`;

  useEffect(() => {
    const fetchChannelName = async () => {
      try {
        const response = await fetch(`/api/channels/${channelId}`);
        if (response.ok) {
          const channel = await response.json();
          setSelectedChannelName(channel.name);
          setSelectedChannelId(channelId);
          console.log(`You are now in Channel: "${channelNameTemplate}", ID: ${channelIDTemplate}`);
        } else {
          throw new Error("Failed to load channel name");
        }
      } catch (error) {
        console.error("Error loading channel:", error);
        setSelectedChannelName("Error loading channel");
      }
    };

    fetchChannelName();
  }, [channelId]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      console.log("Fetching current user..."); // Add logging
      try {
        const user = await currentUser();
        console.log('Fetched current user:', user); // Add logging
        if (user) {
          setCurrentUserId(user.id);
          console.log('Current user ID set to:', user.id); // Log currentUserId after setting it
          setUserMessages([
            {
              name: user.name || "Orchid",
              img: user.image || defaultAvatar, // Use user image or fallback URL
              userID: user.id,
              messages: [],
            },
          ]);
        } else {
          console.error("User is not authenticated");
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    console.log('Current User ID in useEffect:', currentUserId); // Add logging

    // Establish WebSocket connection
    socket.current = new WebSocket('ws://localhost:8080');

    socket.current.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('WebSocket message received:', message);

      // Update state with new message
      setUserMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const existingUserIndex = updatedMessages.findIndex(
          (userMessage) => userMessage.userID === message.userId
        );

        if (existingUserIndex !== -1) {
          updatedMessages[existingUserIndex].messages.push(convertMessageBody(message));
        } else {
          updatedMessages.push({
            name: message.user.name,
            img: message.user.image || defaultAvatar, // Use user image or fallback URL
            userID: message.userId,
            messages: [convertMessageBody(message)],
          });
        }

        return updatedMessages;
      });
    };

    socket.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    socket.current.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [currentUserId]); // Add dependency on currentUserId

  const sendMessage = async (message: string): Promise<void> => {
    console.log('sendMessage called'); // Log when sendMessage is called
    console.log('Current User ID in sendMessage:', currentUserId); // Log currentUserId in sendMessage
    try {
      if (!selectedChannelId) {
        console.error("Channel ID is not set");
        return;
      }

      const userId = currentUserId; // Ensure this is valid and set
      if (!userId) {
        console.error("User ID is not set");
        return;
      }

      console.log('Sending message with User ID:', userId); // Add logging

      const channelId = selectedChannelId;

      // Send the message to the WebSocket server
      const newMessage = {
        content: message,
        channelId,
        userId,
      };

      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        socket.current.send(JSON.stringify(newMessage));
      } else {
        console.error("WebSocket is not connected");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const convertToUserMessages = (messages: Array<any>): NEWUserMessage[] => {
    const convertedUserMessages: NEWUserMessage[] = [];
    let lastUserID: string = "";
    let currentUserMessage: NEWUserMessage = {
      name: "coffee",
      messages: [],
      img: null,
      userID: "3"
    };

    messages.forEach(message => {
      if (message.userId === lastUserID) {
        currentUserMessage.messages.push(convertMessageBody(message));
        return;
      }
      if (lastUserID !== "") {
        convertedUserMessages.push(currentUserMessage);
      }
      currentUserMessage = {
        name: message.user.name || "Orchid", // Replace with actual name from user data
        userID: message.userId,
        messages: [convertMessageBody(message)],
        img: message.user.image || defaultAvatar // Use user image or fallback URL
      };
      lastUserID = message.userId;
    });

    if (currentUserMessage.messages.length > 0) {
      convertedUserMessages.push(currentUserMessage);
    }
    return convertedUserMessages;
  };

  const convertMessageBody = (message: any): Message => {
    const date = new Date(message.createdAt);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

    return {
      time: formattedTime,
      text: message.content,
      id: message.id
    };
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/directMessages?id=${channelId}&createdTS=0`);
        console.log(`Here are the fetched messages for "${channelNameTemplate}", ID: ${channelIDTemplate}`, response.data);
        setUserMessages(convertToUserMessages(response.data));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (selectedChannelId) {
      fetchMessages();
    }
  }, [selectedChannelId]);

  return (
    <>
      <MessageNav channelName={selectedChannelName} channelId={selectedChannelId} />
      <div className="flex flex-col justify-between h-full">
        <div className="overflow-auto flex-grow max-h-[720px]">
          {userMessages.map((userMessage, index) => (
            <ExistingUserMessages
              key={index}
              img={userMessage.img || defaultAvatar} // Ensure img is a URL
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
