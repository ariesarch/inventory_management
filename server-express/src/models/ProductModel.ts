import { Schema,model } from "mongoose";
import { IProduct } from "./interfaces/IProduct";

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
});

const Product = model<IProduct>('Product', productSchema);
export { Product };
