import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const usersInRoom = new Map();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer,{
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {

    socket.on("join-chat",({senderId, receiverId})=>{
      const chatId = [senderId, receiverId].sort().reverse().join("-");
      socket.join(chatId);
    })

    socket.on("join-room", ({ senderId, receiverId}) => {
      const roomId = [senderId, receiverId].sort().join("-");
      const chatId = [senderId, receiverId].sort().reverse().join("-");
      socket.join(roomId);
      usersInRoom.set(senderId, socket.id);
      io.to(roomId).emit("join-receiver",{receiverId : senderId});
      
      io.to(chatId).emit("change-status",{ownId : senderId});
      console.log(`${senderId} joined on room ${roomId}`);
    });

    socket.on("send-message", async ({ senderId, receiverId, text, image }) => {
      const roomId = [senderId, receiverId].sort().join("-");
      const chatId = [senderId, receiverId].sort().reverse().join("-");
      const messageStatus = usersInRoom.has(receiverId) ? "seen" : "unseen";
      io.to(roomId).emit("receive-message", { senderId, text, image, status : messageStatus })
      io.to(chatId).emit("receive",{senderId, text, messageStatus});
    });

    socket.on("disconnect",()=>{
      for (const [userId, socketId] of usersInRoom.entries()) {
        if (socketId === socket.id) {
            usersInRoom.delete(userId);
            console.log(`Removed user ${userId} from active users`);
            break;
        }
      }
    })
  });

  httpServer.listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
  });

});