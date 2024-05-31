import { BaseRepository } from './BaseRepository';
import { IOrder } from '@/models/interfaces/IOrder';
import Order from '@/models/OrderModel';
class OrderRepository extends BaseRepository<IOrder> {
  constructor() {
    super(Order);
  }
  async findByUserId(userId: string): Promise<IOrder[]> {
        return this.model.find({ user: userId }).populate('products.product').exec();
    }
}

export const orderRepository = new OrderRepository();

