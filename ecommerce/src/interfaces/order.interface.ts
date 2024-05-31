export interface Order {
  _id: string;
  user: string;
  products: { productId: string; quantity: number }[];
  totalAmount: number;
  status: string; 
  createdAt: string;
  updatedAt: string;
}
type Product = {
  productId: string;
  quantity: Number
}
export interface OrderPayload {
  products: Product[]
}
export interface OrderResponse {
  status:Number;
  order: Order,
}