'use client'
import ErrorMessage from "@/components/atoms/ErrorMessage";
import AddToCartButton from "@/components/molecules/cart/AddToCartButton";
import SocketComponent from "@/components/SocketComponent";
import { useOrderDetailQuery } from "@/hooks/queries/orders/use-orders.query";
import { Order } from "@/interfaces/order.interface";
import Image from "next/image";
import { useParams } from "next/navigation"; const OrderDetailScreen = () => {
    const { slug } = useParams()
    const { isLoading, isError, data, error, refetch } = useOrderDetailQuery(slug as string)
    const order = data as Order;
    if (isError && error) return <ErrorMessage message={error.message} />;
    return (
        <div className="flex flex-col items-center lg:flex-row lg:items-start justify-center gap-10 lg:gap-20 my-5 lg:my-10">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="flex flex-col divide-y-2" style={{ maxWidth: '600px' }}>
                        <div className="mb-3">
                            <p className="headline-5 font-medium text-neutral-500 mb-5">
                                Tracking: {order?._id}
                            </p>
                            <div>
                                <SocketComponent order={order} />
                            </div>
                            <h3 className="headline-6 font-medium">Total Amount: {order?.totalAmount}</h3>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
export default OrderDetailScreen;