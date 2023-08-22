const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3001 }); // Signaling server will run on port 4444

// Store connected clients
const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  console.log("Client connected");

  ws.on('open', () => {
    console.log('WebSocket connection opened'); 
  });

  ws.on("message", (message) => {
    // Broadcast the received message to all other clients
    console.log(`==> : message:`, message);

    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Client disconnected");
  });
});