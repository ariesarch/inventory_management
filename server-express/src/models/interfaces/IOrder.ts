import { Document,Schema } from "mongoose"
import OrderStatus from "../../enum/order_statuses";

export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  products: { productId: Schema.Types.ObjectId; quantity: number }[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
