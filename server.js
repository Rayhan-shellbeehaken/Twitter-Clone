import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";


const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer,{
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {

    socket.on("join-room", async({ senderId, receiverId }) => {
      const roomId = [senderId, receiverId].sort().join("-");
      // const room = await createNewRoom(roomId);
      socket.join(roomId);
      console.log(`${senderId} joined room: ${roomId}`);
    });

    socket.on("send-message", async ({ senderId, receiverId, text }) => {
      console.log(`${senderId} :: ${text}`);
      const roomId = [senderId, receiverId].sort().join("-");
      io.to(roomId).emit("receive-message", { senderId, text })
    });

    socket.on("disconnect",()=>{
      console.log("Disconnected ",socket.id);
    })
  });

  httpServer.listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
  });

});