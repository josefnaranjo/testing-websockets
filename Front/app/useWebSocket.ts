import { useEffect, useRef, useState } from "react";

const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    socket.current = new WebSocket(url);

    socket.current.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.current.onclose = (event) => {
      console.log("WebSocket disconnected", event);
    };

    socket.current.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [url]);

  const sendMessage = (message: any) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify(message));
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;

// Use the hook with your EC2 instance's public IP address or domain name
const { messages, sendMessage } = useWebSocket("ws://52.14.109.249:8080");
