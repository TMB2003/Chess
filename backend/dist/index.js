"use strict";

const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
    console.log("New client connected");

    ws.on("error", (err) => {
        console.error("WebSocket error:", err);
    });

    ws.on("message", (data) => {
        console.log("Received message:", data.toString());
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });

    // Send a message only if the connection is open
    if (ws.readyState === ws.OPEN) {
        ws.send("Hello from WebSocket server!");
    }
});

console.log("WebSocket server is running on ws://localhost:8080");
