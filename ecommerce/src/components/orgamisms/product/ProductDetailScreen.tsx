'use client'
import ErrorMessage from "@/components/atoms/ErrorMessage";
import AddToCartButton from "@/components/molecules/cart/AddToCartButton";
import { useProductDetailQuery } from "@/hooks/queries/products/use-products.query";
import Image from "next/image";
import { useParams } from "next/navigation"; const ProductDetailScreen = () => {
    const { slug } = useParams()
    const { isLoading, isError, data, error, refetch } = useProductDetailQuery(slug as string)
    const product = data;
    if (isError && error) return <ErrorMessage message={error.message} />;
    return (
        <div className="flex flex-col items-center lg:flex-row lg:items-start justify-center gap-10 lg:gap-20 my-5 lg:my-10">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Image
                        className="relative"
                        src="/next.svg"
                        alt="Next.js Logo"
                        width={180}
                        height={37}
                        priority
                    />
                    <div className="flex flex-col divide-y-2" style={{ maxWidth: '500px' }}>
                        <div className="mb-3">
                            <h3 className="headline-3 font-medium text-neutral-500 mb-5">
                                {product?.name}
                            </h3>
                            <div>
                                <h4 className="text-neutral-300 text-base font-medium mb-1">
                                    Price
                                </h4>
                                <p className="headline-5 font-semibold text-shades-100">
                                    {product?.price.toLocaleString()} MMK
                                </p>
                            </div>
                        </div>
                        <AddToCartButton
                            _id={product?._id??''}
                            price={product?.price??0}
                            name={product?.name??''}
                            quantity={product?.quantity}
                            stock={product?.stock}
                        />
                    </div>
                </>
            )}
        </div>
    )
}
export default ProductDetailScreen;