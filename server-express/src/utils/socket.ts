// src/utils/socket.ts
import { Server as HTTPServer } from 'http';
import { Server, Socket } from 'socket.io';

let io: Server | null = null;

export const setupSocket = (server: HTTPServer): Server => {
  io = new Server(server,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

  io.on('connection', (socket: Socket) => {
    socket.on('joinOrderRoom', (orderId: string) => {
      // console.log("Joined Room")
      // socket.join(userId);
      socket.join(`order_${orderId}`);
      console.log(`User joined room: order_${orderId}`);
    });

    socket.on('leaveOrderRoom', (orderId: string) => {
      socket.leave(orderId);
    });

    socket.on('orderStatusUpdate', (orderId: string, status: string) => {
      io?.to(orderId).emit('orderStatus', status);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

export const getSocket = (): Server | null => io;
