import Pusher from "pusher-js";
import { useState, useEffect } from "react";

interface NewMessage {
  content: string;
  channelId: string;
  userId: string;
}

export default function usePusher(channelName: string, eventName: string) {
  const [messages, setMessages] = useState<NewMessage[]>([]);

  useEffect(() => {
    const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY as string;
    const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string;

    if (!pusherKey || !pusherCluster) {
      console.error("Pusher configuration is missing");
      return;
    }

    console.log("Initializing Pusher with key:", pusherKey);
    const pusher = new Pusher(pusherKey, {
      cluster: pusherCluster,
    });

    const channel = pusher.subscribe(channelName);
    console.log("Subscribed to channel:", channelName);

    channel.bind(eventName, (data: NewMessage) => {
      console.log("Received new message:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [channelName, eventName]);

  const sendMessage = (message: NewMessage) => {
    console.log("Sending message:", message);
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
