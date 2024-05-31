import { useMutation } from "@tanstack/react-query";
import {orderService, OrderPayload } from "@/api/services/order.service";
export const useOrderMutation = () => {
  return useMutation(
    {
        mutationFn:(input: OrderPayload) => orderService.placeOrder(input)
    }
  );
};
