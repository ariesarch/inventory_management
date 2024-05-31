import { Request, Response } from 'express';
import { orderService } from '@/services/OrderService';

class OrderController {
    async index(req: Request, res: Response): Promise<void> {
    try {
      const orders = await orderService.findAll();
      res.status(200).send(orders);
    }catch (error: any) {
      res.status(error.statusCode || 500).json({
          status: error.statusCode || 500,
          message: error.message
      });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const order = await orderService.create(req.body);
      res.status(201).send(order);
    }catch (error: any) {
      res.status(error.statusCode || 500).json({
          status: error.statusCode || 500,
          message: error.message
      });
    }
  }
   async updateStatus(req: Request, res: Response) {
        try {
            const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
            res.status(200).json({
                status: 200,
                order
            });
        }catch (error: any) {
          res.status(error.statusCode || 500).json({
              status: error.statusCode || 500,
              message: error.message
          });
        }
    }
}

export const orderController = new OrderController();
