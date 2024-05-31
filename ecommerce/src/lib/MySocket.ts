import { io } from 'socket.io-client';

class MySocket {
    public socket: any;
    public URL: string;
    constructor() {
        this.URL = 'http://localhost:8081';
        this.socket = io(this.URL, { withCredentials: true,autoConnect: true });
        this.socket.onAny((event: any, ...args: any) => {
            console.log(event, args);
        });
        this.socket.on("connect_error", (err: any) => {
            if (err.message === "invalid username") {
                console.log("++++++++++++++", err);
            }
        });
        this.socket.on("connect", () => {
            console.log('Connected to Socket.IO server');
        });
    }
    joinOrderRoom(orderId: string) {
        this.socket.emit('joinOrderRoom', orderId);
    }
    onOrderStatusUpdate(callback: (data: any) => void) {
        this.socket.on('orderStatusUpdated', callback);
    }

    connectToSocket(sessionID: string) {
        this.socket.auth = { sessionID };
        this.socket.connect();
    }
}

export default MySocket;