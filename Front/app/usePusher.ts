import { useState, useEffect } from "react";
import Pusher from "pusher-js";

interface NewMessage {
  content: string;
  channelId: string;
  userId: string;
}

export default function usePusher(channelName: string, eventName: string) {
  const [messages, setMessages] = useState<NewMessage[]>([]);

  useEffect(() => {
    const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY!;
    const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER!;

    if (!pusherKey || !pusherCluster) {
      console.error("Pusher configuration is missing");
      return;
    }

    const pusher = new Pusher(pusherKey, {
      cluster: pusherCluster,
      forceTLS: true,
    });

    const channel = pusher.subscribe(channelName);

    channel.bind(eventName, (data: NewMessage) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [channelName, eventName]);

  const sendMessage = (message: NewMessage) => {
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
