import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let clients = new Set();

wss.on('connection', (ws, req) => {
  console.log('5 Server: New client connected', ws, 'from', req.socket.remoteAddress);
  clients.add(ws);

  // Receive message from this client
  ws.on('message', (msg) => {
    console.log('6 Server received message:', msg.toString());

    // Broadcast message to all clients
    clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        console.log('7 Server: Broadcasting message to client:', client);
        client.send(msg.toString() + ' (broadcasted)'); // Append text to indicate it's broadcasted
      }
    });
  });

  ws.on('close', () => {
    console.log('7 Server: Client disconnected');
    clients.delete(ws);
  });
});

server.listen(8080, () => {
  console.log('WebSocket server is running on ws://localhost:8080');
});
