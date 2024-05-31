import React from "react";
import { cartReducer, State, initialState} from '@/utils/cart.reducer';
import { getItem } from "@/utils/cart";
import { useLocalStorage } from "react-use";
import { Product } from "@/interfaces/product.interface";
type cartProps = {
    children: React.ReactNode;
    props?: any;
};
interface CartProviderState extends State {
    addItemToCart: (item: Product, quantity: number) => void;
    isInCart: (id: Product["_id"]) => boolean;
    resetCart: () => void;
}
export const cartContext = React.createContext<CartProviderState | undefined>(
    undefined
);

cartContext.displayName = "CartContext";

export const useCart = () => {
    const context = React.useContext(cartContext);
    if (context === undefined) {
        throw new Error(`useCart must be used within a CartProvider`);
    }
    return context;
};

export const CartProvider: React.FC<cartProps> = ({ props, children }) => {
    const [savedCart, saveCart] = useLocalStorage(
        'cart',
        JSON.stringify(initialState)
    );
    const [state, dispatch] = React.useReducer(
        cartReducer,
        JSON.parse(savedCart!)
    );
    React.useEffect(() => {
        saveCart(JSON.stringify(state));
    }, [state, saveCart]);

    const addItemToCart = (item: Product, quantity: number) =>
        dispatch({ type: "ADD_ITEM_WITH_QUANTITY", item, quantity });
    const isInCart = (id: Product["_id"]) => !!getItem(state.items, id);
    const resetCart = () => dispatch({ type: "RESET_CART" });
    const value = React.useMemo(
        () => ({
            ...state,
            addItemToCart,
            isInCart,
            resetCart
        }),
        [state]
    );
    return (
        <cartContext.Provider value={value} {...props}>
            {children}
        </cartContext.Provider>
    );
};
