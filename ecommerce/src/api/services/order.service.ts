import http from '@/utils/api/http';
import { API_ENDPOINTS } from '@/utils/api/endpoints';
import { Order, OrderPayload } from '@/interfaces/order.interface';

export class OrderService {
    async fetchOrders(page: number) {
        const { data } = await http.get(API_ENDPOINTS.ORDERS, {
            params: { page },
        });
        return data;
    }
    async placeOrder(input: OrderPayload) {
        const { data } = await http.post(API_ENDPOINTS.ORDERS,input);
        return data;
    }
    async fetchOrderDetail(slug: string): Promise<Order> {
        const { data } = await http.get(`${API_ENDPOINTS.ORDERS}/${slug}`);
        return data;
    }
}

export const orderService = new OrderService();