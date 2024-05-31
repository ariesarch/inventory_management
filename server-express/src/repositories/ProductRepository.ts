import { Product } from '@/models/ProductModel';
import { IProduct } from '@/models/interfaces/IProduct';
import { BaseRepository } from '@/repositories/BaseRepository';
class ProductRepository extends BaseRepository<IProduct> {
    constructor() {
        super(Product);
    }
}
export const productRepository = new ProductRepository();
