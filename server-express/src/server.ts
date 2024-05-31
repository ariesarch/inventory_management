import 'tsconfig-paths/register';
import 'reflect-metadata';
import express,{ Express } from "express";
import dashboardRoute from './routes/dashboardRoute';
import customerRoute from "./routes/customerRoute";
import config from "./config";
import {Server} from "http";
import { connectDB } from "@/database/connection";
// import { Server as SocketIOServer } from "socket.io";
import { setupSocket } from '@/utils/socket';
import cors from 'cors';
import { errorConverter,errorHandler } from '@/middleware/Error';
import { ApiError } from './utils';
const app: Express = express();
// app.use(cors());
app.use(cors({
  origin: ['http://localhost:3000'], // replace with your Next.js app's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(dashboardRoute)
app.use(customerRoute)
app.use((req, res, next) => {
    const err = new ApiError(404, 'Not Found');
    next(err);
});
app.use(errorConverter);
app.use(errorHandler);
// app.use(notFoundHandler)

connectDB();
let server: Server;
server = app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});

// Setup Socket.IO
// const io: SocketIOServer = new SocketIOServer(server);
// io.on("connection", (socket) => {
//     console.log("New client connected");
//     // Add your Socket.IO logic here
//     socket.on("disconnect", () => {
//         console.log("Client disconnected");
//     });
// });
setupSocket(server);
export default server;