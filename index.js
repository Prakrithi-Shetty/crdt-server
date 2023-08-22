const WebSocket = require("ws");
const https = require("https");
const fs = require("fs");

const port = process.env.PORT || 3001;

const server = https.createServer({
  cert: fs.readFileSync("path/to/cert.crt"),
  key: fs.readFileSync("path/to/private-key.key"),
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast the received message to all other clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`WebSocket server is listening on port ${port}`);
});
