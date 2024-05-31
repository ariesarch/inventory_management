import { Request, Response } from 'express';
import { categoryService } from '@/services/CategoryService';
class CategoryController {
    async index(req: Request, res: Response): Promise<void> {
    try {
      const categories = await categoryService.findAll();
      res.status(200).send(categories);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
          status: error.statusCode || 500,
          message: error.message
      });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const category = await categoryService.create(req.body);
      res.status(201).send(category);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
          status: error.statusCode || 500,
          message: error.message
      });
    }
  }

  async show(req: Request, res: Response): Promise<void> {
    try {
      const category = await categoryService.findById(req.params.id);
      if (category) {
        res.status(200).send(category);
      } else {
        res.status(404).send({ message: 'Category not found' });
      }
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
          status: error.statusCode || 500,
          message: error.message
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const category = await categoryService.update(req.params.id, req.body);
      res.status(200).send(category);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
          status: error.statusCode || 500,
          message: error.message
      });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await categoryService.delete(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
          status: error.statusCode || 500,
          message: error.message
      });
    }
  }
}

export const categoryController = new CategoryController();
