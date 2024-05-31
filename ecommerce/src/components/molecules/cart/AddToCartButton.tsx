'use client'
import { useCart } from '@/contexts/cart.context';
import CustomButton from '@/components/atoms/CustomButton';
import { Product } from '@/interfaces/product.interface';
import { useRouter } from 'next/navigation';
const AddToCartButton: React.FC<Product> = ({
    _id,
    price,
    name,
    quantity,
    stock,
}: Product) => {
    const { addItemToCart, isInCart } = useCart();
    const router = useRouter();
    const handleViewInBag = () => {
        router.push('/cart');
    };
    const handleAddToCart = () => {
        addItemToCart(
            {
                _id,
                price,
                name,
            },
            quantity ?? 1
        );
    };
    return (
        <div className="flex flex-col gap-4">
            {isInCart(_id) ? (
                <CustomButton onClick={handleViewInBag}>View in Cart</CustomButton>
            ) : (
                <CustomButton onClick={handleAddToCart}>Add to Cart</CustomButton>
            )}
        </div>
    );
};
export default AddToCartButton;
