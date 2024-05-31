import { Request, Response } from 'express';
import { orderService } from '@/services/OrderService';
import { AuthRequest } from '@/models/interfaces/AuthRequest';
class OrderController {
    async index(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const orders = await orderService.getOrdersByUserId(userId);
      res.status(200).send(orders);
    } catch (error:any) {
        res.status(error.statusCode || 500).json({
          status: error.statusCode || 500,
          message: error.message
        });
    }
  }

  async show(req: Request, res: Response): Promise<void> {
    try {
      const order = await orderService.findById(req.params.id);
        res.status(200).send(order);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
          status: error.statusCode || 500,
          message: error.message
      });
    }
  }

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { user, body } = req;
      if (user) {
          body.user = user;
      }
      console.log("Req: ", body)
      const order = await orderService.create(body);
      res.status(201).send({order});
    } catch (error:any) {
        res.status(error.statusCode || 500).json({
          status: error.statusCode || 500,
          message: error.message
        });
    }
  }
}

export const orderController = new OrderController();
