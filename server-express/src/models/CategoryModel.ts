import { Schema, model } from 'mongoose';
import { ICategory } from './interfaces/ICategory';
const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true }
});

const Category = model<ICategory>('Category', categorySchema);
export { Category };

