import Pusher from 'pusher-js';
import { useState, useEffect } from 'react';

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
      console.error('Pusher configuration is missing');
      return;
    }

    // Initialize Pusher without explicit useTLS
    const pusher = new Pusher(pusherKey, {
      cluster: pusherCluster,
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

  const sendMessage = (message: any) => {
    fetch('/api/pusher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ channelName, eventName, message }),
    });
  };

  return { messages, sendMessage };
}
