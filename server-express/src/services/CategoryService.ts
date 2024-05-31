import { categoryRepository } from "@/repositories/CategoryRepository";
class CategoryService {
  async create(data: any) {
    return await categoryRepository.create(data);
  }

  async findAll() {
    return await categoryRepository.findAll();
  }

  async findById(id: string) {
    return await categoryRepository.findById(id);
  }

  async update(id: string, data: any) {
    return await categoryRepository.update(id, data);
  }

  async delete(id: string) {
    await categoryRepository.delete(id);
  }
}

export const categoryService = new CategoryService();