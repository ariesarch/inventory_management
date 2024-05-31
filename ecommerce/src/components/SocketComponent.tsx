'use client'
import { useEffect, useRef, useState } from 'react';
import MySocket from '@/lib/MySocket';
import { Order } from '@/interfaces/order.interface';
const mySocket = new MySocket();

const SocketComponent = ({ order }: { order: Order }) => {
    // const [orderStatus, setOrderStatus] = useState<string>('');
    const [orderStatus, setOrderStatus] = useState<string>(order.status || '');
    useEffect(() => {
        // Connect and join order room
        mySocket.connectToSocket('your-session-id-here'); // Make sure to use the actual session ID
        mySocket.joinOrderRoom(order._id);

        // Set up the event listener for order status updates
        const handleOrderStatusUpdate = (data: any) => {
            setOrderStatus(data.status); // Assuming the status is in the data object
        };

        mySocket.onOrderStatusUpdate(handleOrderStatusUpdate);

        // Clean up the effect
        return () => {
            mySocket.socket.off('orderStatusUpdated', handleOrderStatusUpdate);
        };
    }, [order]);


    return (
        <div className='font-bold'>
            <p>Status: {orderStatus}</p>
        </div>
    );
};

export default SocketComponent;
