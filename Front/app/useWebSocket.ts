import Pusher from "pusher-js";
import { useState, useEffect } from "react";

// Define the Message interface to specify the structure of messages
interface Message {
  id: string;
  createdAt: string;
  text: string;
  displayTime: string;
  userId: string;
  userName: string;
  userImage: string | null;
}

export default function usePusher(channelName: string, eventName: string) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY as string;
    const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string;

    if (!pusherKey || !pusherCluster) {
      console.error("Pusher configuration is missing");
      return;
    }

    // Initialize Pusher instance
    const pusher = new Pusher(pusherKey, {
      cluster: pusherCluster,
      // Automatically use TLS if the app is served over HTTPS
    });

    const channel = pusher.subscribe(channelName);

    channel.bind(eventName, (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [channelName, eventName]);

  // Define the sendMessage function with explicit type for the message parameter
  const sendMessage = (message: Message) => {
    fetch("/api/pusher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channelName,
        eventName,
        message,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Message sent:", data);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return { messages, sendMessage };
}
