import {
  addItemWithQuantity,
  calculateTotalAmount,
  calculateUniqueItems,
  calculateItemTotals,
  preparedPayload,
} from "./cart";
import { Product } from "@/interfaces/product.interface";
interface Metadata {
  [key: string]: any;
}

type Action =
  | { type: "ADD_ITEM_WITH_QUANTITY"; item: Product; quantity: number }
  | { type: "RESET_CART" };

export interface State {
  items: Product[];
  isEmpty: boolean;
  totalItems: number;
  totalUniqueItems: number;
  total: number;
  meta?: Metadata | null;
  tranformedOrderPayload:{}
}
export const initialState: State = {
  items: [],
  isEmpty: true,
  totalItems: 0,
  totalUniqueItems: 0,
  total: 0,
  meta: null,
  tranformedOrderPayload: {}
};
export function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_ITEM_WITH_QUANTITY": {
      const items = addItemWithQuantity(
        state.items,
        action.item,
        action.quantity
      );
      return generateFinalState(state, items);
    }
    case "RESET_CART":
      return initialState;
    default:
      return state;
  }
}

const generateFinalState = (state: State, items: Product[]) => {
  const totalUniqueItems = calculateUniqueItems(items);
  return {
    ...state,
    items: calculateItemTotals(items),
    totalUniqueItems,
    total: calculateTotalAmount(items),
    isEmpty: totalUniqueItems === 0,
    tranformedOrderPayload: preparedPayload(items)
  };
};
