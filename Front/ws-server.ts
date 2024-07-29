import { WebSocketServer } from 'ws';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', async (message) => {
    const parsedMessage = JSON.parse(message.toString());
    const { channelId, content, userId } = parsedMessage;

    try {
      // Check if the user exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error(`User with ID ${userId} does not exist`);
      }

      const savedMessage = await prisma.message.create({
        data: {
          content,
          channelId: String(channelId), // Convert channelId to string
          userId,
        },
        include: {
          user: true, // Include user data
        },
      });

      const responseMessage = {
        ...savedMessage,
        user: {
          name: savedMessage.user.name,
          image: savedMessage.user.image,
        }
      };

      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(JSON.stringify(responseMessage));
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error saving message:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
