'use client'
import ErrorMessage from "@/components/atoms/ErrorMessage";
import ProductList from "@/components/molecules/product/ProductList";
import { ProductsResponse } from "@/interfaces/product.interface";
import { useProductQuery } from "@/hooks/queries/products/use-products.query";
import { useState } from "react";
import CustomButton from "@/components/atoms/CustomButton";
const ProductScreen = ()=>{
    // const[page, setPage] = useState(1);
    const { isLoading, isError, data, error, fetchNextPage, hasNextPage } = useProductQuery();
    if (isError && error) return <ErrorMessage message={error.message} />;
    const products = data?.pages.flatMap(page => page.products) ?? [];
    const handleLoadMore = () => {
        // Fetch next page when "Load More" button is clicked
        fetchNextPage();
        // setPage(prevPage => prevPage + 1);
    };
    return (
        <div className="max-width px-4 md:px-8 md:mt-10 md:mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 place-items-center">
                {isLoading ? (
                    <div>loading...</div>
                ) : (
                    <>
                        {products?.map((product) => (
                            <div key={product._id} className="w-full spotlight-card">
                                <h2>{product.name}</h2>
                                <ProductList product={product}/>
                            </div>
                        ))}                        
                    </>
                )}
            </div>
            {hasNextPage && (
                <CustomButton
                    variant="solid"
                    size="sm"
                    colorschema="primary"
                    onClick={handleLoadMore} // Remove the curly braces here
                >
                    {isLoading ? "Loading..." : "Load More"}
                </CustomButton>
            )}
        </div>
    )
}
export default ProductScreen;