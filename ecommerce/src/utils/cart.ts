import { Product } from "@/interfaces/product.interface";
export interface UpdateItemInput extends Partial<Omit<Product, "_id">> {}

export function addItemWithQuantity(
  items: Product[],
  item: Product,
  quantity: number
) {
  if (quantity <= 0)
    throw new Error("cartQuantity can't be zero or less than zero");
  const existingItemIndex = items.findIndex(
    (existingItem) => existingItem._id === item._id
  );

  if (existingItemIndex > -1) {
    const newItems = [...items];
    newItems[existingItemIndex].quantity! += quantity;
    return newItems;
  }
  return [...items, { ...item, quantity }];
}


export function getItem(items: Product[], id: Product["_id"]) {
  return items.find((item) => item._id === id);
}

export const calculateItemTotals = (items: Product[]) =>
  items.map((item) => ({
    ...item,
    itemTotal: item.price * item.quantity!,
  }));

export const calculateTotalAmount = (items: Product[]) =>
  items.reduce((total, item) => total + item.quantity! * item.price, 0);

export const calculateTotalItems = (items: Product[]) =>
  items.reduce((sum, item) => sum + item.quantity!, 0);

export const calculateUniqueItems = (items: Product[]) => items.length;

export const preparedPayload = (items:Product[])=> {
  return items.map(({ _id, quantity,price }) => ({
    productId:_id,
    quantity,
    price
}));
}