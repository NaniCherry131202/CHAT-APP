import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});
export const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId];
}
const userSocketMap = {}; // { userId: socketId }

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    
    // Check if userId is valid
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    // Emit updated online users list
    io.emit("getOnlineUsers", Object.keys(userSocketMap));  // ✅ Fix: Correct event name

    // Handle user disconnecting
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        delete userSocketMap[userId];

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };
