import { orderRepository } from "@/repositories/OrderRepository";
import { productRepository } from "@/repositories/ProductRepository";
import { IOrder } from "@/models/interfaces/IOrder";
import { getSocket } from '@/utils/socket';
import { ApiError } from "@/utils";
class OrderService {
    async findAll() {
        return await orderRepository.findAll();
    }
    async create(orderData: IOrder): Promise<IOrder> {
        // Retrieve the product information for each product in the order
        const products = await Promise.all(orderData.products.map(async (productData) => {
            const product = await productRepository.findById(productData.productId.toString());
            if (!product) {
                throw new Error(`Product with ID ${productData.productId} not found`);
            }
            return { ...product.toObject(), quantity: productData.quantity };
        }));
        // Calculate the total amount for each product
        const calculatedProducts = products.map((product) => ({
            ...product,
            totalAmount: product.price * product.quantity
        }));
        // Calculate the total amount for the entire order
        orderData.totalAmount = calculatedProducts.reduce((total, product) => total + product.totalAmount, 0);
        const order = await orderRepository.create(orderData);
        // await this.updateInventory(order._id);
        // io.emit('orderCreated', order);
        const io = getSocket();
        if (io) {
            // io.emit('orderCreated', order.status);
            const userId = order.user.toString();
            // io.to(userId).emit('orderCreated', order);
            io.to(`order_${order.id}`).emit('orderStatusUpdated', order);
            console.log("Emitted ordercreated event")
        }
        return order;
    }

    // async updateInventory(orderId: string): Promise<void> {
    //     const order = await orderRepository.findById(orderId);
    //     if (order) {
    //         for (const item of order.products) {
    //             await productRepository.update(item.product.toString(), {
    //                 $inc: { quantity: -item.quantity }
    //             });
    //             io.emit('inventoryUpdate', { productId: item.product, quantity: -item.quantity });
    //         }
    //     }
    // }

    async getOrderStatus(orderId: string): Promise<string | null> {
        const order = await orderRepository.findById(orderId);
        return order ? order.status : null;
    }
        async getOrderById(id: string): Promise<IOrder | null> {
        return orderRepository.findById(id);
    }

    async getOrdersByUserId(userId: string): Promise<IOrder[]> {
        try {
        const orders = await orderRepository.findByUserId(userId);
        if (!orders) {
            throw new ApiError(404, 'Orders not found for the specified user ID');
        }
        return orders;
    } catch (error:any) {
        throw error;
    }
    }

    async updateOrderStatus(id: string, status: string): Promise<IOrder | null> {
        try{
            const order = await orderRepository.update(id, { status } as Partial<IOrder>);
            const io = getSocket();
            if (io) {
                // io.emit('orderStatusUpdate', status);
                io.to(`order_${order?.id}`).emit('orderStatusUpdated', order);
                console.log("Emitted orderupdated event")
            }
            return order;
        }catch(error:any) {
            throw error;
        }
    }
    async findById(id: string) {
    return await orderRepository.findById(id);
  }
}
export const orderService = new OrderService();