import { WebSocketServer } from "ws";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

// Update the port if necessary; 8080 is commonly used for WebSocket servers
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", async (message) => {
    const parsedMessage = JSON.parse(message.toString());
    const { channelId, content, userId } = parsedMessage;

    try {
      const savedMessage = await prisma.message.create({
        data: {
          content,
          channelId: String(channelId),
          userId,
        },
        include: {
          user: true,
        },
      });

      const responseMessage = {
        ...savedMessage,
        user: {
          name: savedMessage.user.name,
          image: savedMessage.user.image,
        },
      };

      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(JSON.stringify(responseMessage));
        }
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://0.0.0.0:8080");
