// src/repositories/CategoryRepository.ts
import { BaseRepository } from './BaseRepository';
import { ICategory } from '../models/interfaces/ICategory';
import { Category } from '../models/CategoryModel';
class CategoryRepository extends BaseRepository<ICategory> {
  constructor() {
    super(Category);
  }
}

export const categoryRepository = new CategoryRepository();
