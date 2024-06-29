// server.js

import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';

const app = express();
const port = 8080;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Create an HTTP server using Express
const server = http.createServer(app);

// Create a WebSocket server and attach it to the HTTP server
const wss = new WebSocketServer({ server });

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Message handler for this connection
  ws.on('message', (message) => {
    console.log('received: %s', message);

    // Echo the message back to the client
    ws.send(`${message}`);
  });

  // Connection close handler
  ws.on('close', () => {
    console.log('Client disconnected');
  });

  // Send a message to the client upon connection
  ws.send(JSON.stringify({"event":"Connected" ,"message": "Welcome to the WebSocket server"}));
});

// Start the server
server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
