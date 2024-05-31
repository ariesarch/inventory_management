import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/utils/api/endpoints'
import { orderService } from '@/api/services/order.service';
import { Order } from '@/interfaces/order.interface';
export const useOrderDetailQuery = (slug: string) => {
  return useQuery<Order, Error>({
    queryKey: [API_ENDPOINTS.ORDERS, slug],
    queryFn: ()=>orderService.fetchOrderDetail(slug)
});
}