import { useEffect, useState } from "react";
import Pusher from "pusher-js";

const usePusher = (channelId: string, eventName: string) => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
      authEndpoint: "/api/pusher/auth",
    });

    const channel = pusher.subscribe(`presence-channel-${channelId}`);

    channel.bind(eventName, (data: any) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      pusher.unsubscribe(`presence-channel-${channelId}`);
    };
  }, [channelId, eventName]);

  const sendMessage = async (message: any) => {
    try {
      await fetch("/api/pusher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return { messages, sendMessage };
};

export default usePusher;
