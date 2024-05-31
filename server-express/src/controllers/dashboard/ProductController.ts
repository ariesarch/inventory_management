import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { productService } from '@/services/ProductService';
class ProductController {
    async index(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    try {
      const products = await productService.findAll({ page, limit });
      res.status(200).json(products);
    }catch (error: any) {
      res.status(error.statusCode || 500).json({
          status: error.statusCode || 500,
          message: error.message
      });
    }
  }
  async create(req: Request, res: Response): Promise<void> {
    try {
      const product = await productService.create(req.body);
      res.status(201).send(product);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
          status: error.statusCode || 500,
          message: error.message
      });
    }
  }

  async show(req: Request, res: Response): Promise<void> {
    try {
      const product = await productService.findById(req.params.id);
      if (product) {
        res.status(200).send(product);
      } else {
        res.status(404).send({ message: 'Product not found' });
      }
    }catch (error: any) {
      res.status(error.statusCode || 500).json({
          status: error.statusCode || 500,
          message: error.message
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const product = await productService.update(req.params.id, req.body);
      res.status(200).send(product);
    }catch (error: any) {
      res.status(error.statusCode || 500).json({
          status: error.statusCode || 500,
          message: error.message
      });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await productService.delete(req.params.id);
      res.status(204).send();
    }catch (error: any) {
      res.status(error.statusCode || 500).json({
          status: error.statusCode || 500,
          message: error.message
      });
    }
  }
}

export const productController = new ProductController();
