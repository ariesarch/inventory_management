'use client'
import CustomButton from "@/components/atoms/CustomButton";
import { useCart } from "@/contexts/cart.context";
import { useModalAction } from "@/contexts/modal.context";
import { useUI } from "@/contexts/ui.context";
import { useOrderMutation } from "@/hooks/mutations/order/use-order.mutation";
import { Product } from "@/interfaces/product.interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const CartScreen = ()=>{
    const { isAuthorize } = useUI()
    const { openModal, closeModal } = useModalAction()
    const { items, total, isEmpty, tranformedOrderPayload, resetCart } = useCart()
    const [cartProducts,setCartProducts] = useState<Product[]>([]);
    const [isClient, setIsClient] = useState(false)
    const { mutate: placeOrder } = useOrderMutation();
    const router = useRouter()
    useEffect(()=> {
        setCartProducts(items)
    },[items,total])
    useEffect(() => {
        setIsClient(true)
    }, [])
    const handleCheckout = () => {
        if (!isAuthorize) {
            return openModal('LOGIN_VIEW')
        }
        console.log("payloadis: ", tranformedOrderPayload)
        placeOrder(
            { products: tranformedOrderPayload },
            {
                onSuccess: ({ order }) => {
                    resetCart()
                    router.push(`/order/${order._id}`);
                },
                onError: (error: any) => {
                    console.log(error.message);
                },
            }
        );
    }
    return (
            <div>
            {isClient && (
                <>
                    {isEmpty ? (<h3 className="text-center headline-3">Empty Bag</h3>):(
                        <div className="flex md:flex-row flex-col gap-6">
                            <div className="flex justify-between items-start border-b-2 py-10 w-full">
                                <div className="flex flex-col items-start gap-5 w-1/2">
                                    {
                                        cartProducts.map((item: any) => (
                                            <div className="flex flex-col gap-2" key={item._id}>
                                                <h3 className="headline-5">{item.name}</h3>
                                                <h4>{item.quantity} x {item.price} = {item.itemTotal}</h4>
                                                <div className="w-[800px] h-[1px] mt-4 bg-neutral-900"></div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between gap-20 items-start mt-10 w-1/2">
                                <div className="w-full">
                                    <h2 className="ont-medium headline-5">Summary</h2>
                                    <div className="flex flex-col divide-y-2">
                                        <div className="pb-7">
                                            <div className="flex paragraph-3 font-medium text-neutral-400 justify-between mb-4">
                                                <p>Total</p>
                                                {total}
                                            </div>
                                        </div>
                                        <CustomButton onClick={handleCheckout}>
                                            Place Order
                                        </CustomButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                </>
                )}
            </div>
    )
}
export default CartScreen;