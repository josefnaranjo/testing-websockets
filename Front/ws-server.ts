import { WebSocketServer } from 'ws';
import { db } from './lib/db.ts'; // Ensure the path is correct based on your project structure

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', async (message) => {
    const parsedMessage = JSON.parse(message.toString());
    const { channelId, content, userId } = parsedMessage;

    try {
      const savedMessage = await db.message.create({
        data: {
          content,
          channelId,
          userId,
        },
      });

      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(JSON.stringify(savedMessage));
        }
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
