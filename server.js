const WebSocket = require('ws');
const http = require('http');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create HTTP server
const server = http.createServer();

// Initialize a WebSocket server
const wss = new WebSocket.Server({ noServer: true });

// Keep track of connected clients
const clients = new Set();

wss.on('connection', (ws) => { 
  clients.add(ws); // Add the client to the connected clients set
  console.log('Client connected'); 

  ws.on('message', async (message) => { 
    try {
      const parsedMessage = JSON.parse(message); // Parse the message
  
      
      if (parsedMessage.type === 'history') {
        // Fetch chat history from the database
        const history = await prisma.chatMessage.findMany({
          take: 50, // Limit the number of messages to last 50 messages
          orderBy: {
            createdAt: 'desc',
          },
        });
  
        // Send the chat history to the client
        ws.send(JSON.stringify({ type: 'history', data: history }));
      } else {
        // Store the message in the database
        await prisma.chatMessage.create({
          data: {
            sender: parsedMessage.name,
            message: parsedMessage.text,
          },
        });

        // Create a message object
        const messageObject = {
          name: parsedMessage.name,
          text: parsedMessage.text
        };

        // Broadcast the message to other clients
        clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) { // Check if the client is ready to receive messages
            client.send(JSON.stringify(messageObject)); // Send the message
          }
        });
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  ws.on('close', () => {
    clients.delete(ws); // Remove the client from the connected clients set
    console.log('Client disconnected'); 
  });

  ws.on('error', (error) => { 
    console.error('WebSocket error:', error); 
  });
});

server.on('upgrade', (request, socket, head) => { 
  wss.handleUpgrade(request, socket, head, (ws) => { 
    wss.emit('connection', ws, request); 
  });
});

const PORT = 3030; // Port number
server.listen(PORT, () => { 
  console.log(`Server is listening on port ${PORT}`); // Listening on port number
});

const gracefulShutdown = () => {  
  prisma.$disconnect().then(() => { // Disconnect Prisma Client
    console.log('Prisma disconnected');
    process.exit(0); // Exit the process
  });
};

process.on('SIGINT', gracefulShutdown); 
process.on('SIGTERM', gracefulShutdown);  
