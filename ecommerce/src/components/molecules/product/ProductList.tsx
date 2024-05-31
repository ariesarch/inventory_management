import { Product } from "@/interfaces/product.interface"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { FC } from "react"

interface Props {
    product: Product
}

const ProductList: FC<Props> = ({
    product
}) => {
    const route = useRouter();
    return (
        <div
            className=" my-6 md:my-12 px-3 lg:px-12 pb-6 md:pb-12 pt-5 md:pt-8"
            style={{
                borderRadius: '8px',
                background: `linear-gradient(rgba(27, 32, 38, 0.72), rgba(27, 32, 38, 0.72)), center`,
            }}
            onClick={() => route.push(`/product/${product._id}`)}
        >
            <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/next.svg"
                alt="Next.js Logo"
                width={180}
                height={37}
                priority
            />
                {product.name}
        </div>
    )
}

export default ProductList;