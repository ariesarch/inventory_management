"use client";

import { io } from "socket.io-client";
const socket = io('http://localhost:8081'); 
// export const socket = io();
export default socket;

