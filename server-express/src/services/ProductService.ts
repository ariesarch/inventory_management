import { Product } from "@/models/ProductModel";
import { productRepository } from "@/repositories/ProductRepository";

class ProductService {
  async create(data: any) {
    try {
      return await productRepository.create(data);
    } catch (error:any) {
      throw error;
    }
  }

  async findAll({ page, limit }: { page: number; limit: number }) {
    try {
      const skip = (page - 1) * limit;
      const products = await Product.find().skip(skip).limit(limit);
      const totalProducts = await Product.countDocuments();
      return {
        products,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
      };
    } catch (error:any) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      return await productRepository.findById(id);
    } catch (error:any) {
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      return await productRepository.update(id, data);
    } catch (error:any) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await productRepository.delete(id);
    } catch (error:any) {
      throw error;
    }
  }
}

export const productService = new ProductService();
