import { Router } from "express";
import { categoryController } from "@/controllers/dashboard/CategoryController";
import { productController } from "@/controllers/customer/ProductController";
import { orderController } from "@/controllers/customer/OrderController";
import authController from "@/controllers/auth/authController";
import { authMiddleware, authorize } from '@/middleware';

const dashboardRoute = Router(); 
// Define routes without prefix
const prefix = '/api/v1';
// auth
dashboardRoute.post(`${prefix}/login`, authController.login);
dashboardRoute.post(`${prefix}/register`, authController.register);
dashboardRoute.post(`${prefix}/logout`,authMiddleware,authController.logout)

// categories
dashboardRoute.get(`${prefix}/categories`, categoryController.index);
dashboardRoute.get(`${prefix}/categories/:id`, categoryController.show);
// products
dashboardRoute.get(`${prefix}/products`, productController.index);
dashboardRoute.get(`${prefix}/products/:id`, productController.show);
// orders
dashboardRoute.post(`${prefix}/orders`,authMiddleware, orderController.create);
dashboardRoute.get(`${prefix}/orders`,authMiddleware, orderController.index);
dashboardRoute.get(`${prefix}/orders/:id`,authMiddleware, orderController.show);
export default dashboardRoute;
