import { model, Schema } from 'mongoose';
import { IOrder } from './interfaces/IOrder';
import OrderStatus from '@/enum/order_statuses';

const OrderSchema: Schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        products: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true },
            },
        ],
        totalAmount: { type: Number },
        status: { type: String, enum: OrderStatus, default: 'Processing' },
    },
    { timestamps: true }
);

// Add indexes
OrderSchema.index({ user: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ 'products.productId': 1 }); // Corrected index definition

// Compound index
// OrderSchema.index({ user: 1, status: 1 });

const Order = model<IOrder>('Order', OrderSchema);
export default Order;
