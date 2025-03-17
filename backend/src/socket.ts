import { Server } from "socket.io";
import http from "http";
import app from "./app";
import { frontendUrl } from "./config";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: frontendUrl,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("userSendsMessage", (message) => {
    console.log("Received message:", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

export { io, server };
