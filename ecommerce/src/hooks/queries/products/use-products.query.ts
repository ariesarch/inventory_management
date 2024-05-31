import { productService } from '@/api/services/product.service';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Product, ProductsResponse } from '@/interfaces/product.interface';
import { API_ENDPOINTS } from '@/utils/api/endpoints'
export const useProductQuery = () => {
  return useInfiniteQuery<ProductsResponse, Error>({
    queryKey: ['products'],
    queryFn: async ({ pageParam = 1 }) => {
      const { products, totalPages, currentPage } = await productService.fetchProducts(pageParam as number);
      return { products, totalPages, currentPage };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });
};


export const useProductDetailQuery = (slug: string) => {
  return useQuery<Product, Error>({
    queryKey: [API_ENDPOINTS.PRODUCTS, slug],
    queryFn: ()=>productService.fetchProductDetail(slug)
});
};
