import { createServer } from "https";
import { WebSocketServer } from "ws";
import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

// Paths to your SSL certificate and private key
const options = {
  key: fs.readFileSync(path.resolve("path/to/your/privkey.pem")), // Update with your path
  cert: fs.readFileSync(path.resolve("path/to/your/fullchain.pem")), // Update with your path
};

const app = express();
const server = createServer(options, app);

const wss = new WebSocketServer({ server });

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

server.listen(443, () => {
  console.log("WebSocket server is running on wss://<your-domain>:443");
});
