import { Router } from "express";
import { categoryController } from "@/controllers/dashboard/CategoryController";
import { productController } from "@/controllers/dashboard/ProductController";
import { orderController } from "@/controllers/dashboard/OrderController";
import authController from "@/controllers/auth/authController";
import { authMiddleware, authorize } from '@/middleware';

const dashboardRoute = Router(); 
// Define routes without prefix
const prefix = '/dashboard';
// auth
dashboardRoute.post(`${prefix}/login`, authController.login);
dashboardRoute.post(`${prefix}/register`, authController.register);

// categories
dashboardRoute.post(`${prefix}/categories`, authMiddleware, authorize('admin'),categoryController.create);
dashboardRoute.get(`${prefix}/categories`, authMiddleware, authorize('admin', 'support'),categoryController.index);
dashboardRoute.get(`${prefix}/categories/:id`, authMiddleware, authorize('admin', 'support'),categoryController.show);
dashboardRoute.put(`${prefix}/categories/:id`, authMiddleware, authorize('admin'),categoryController.update);
dashboardRoute.delete(`${prefix}/categories/:id`, authMiddleware, authorize('admin'),categoryController.delete);
// products
dashboardRoute.post(`${prefix}/products`, authMiddleware, authorize('admin'),productController.create);
dashboardRoute.get(`${prefix}/products`, authMiddleware, authorize('admin', 'support'),productController.index);
dashboardRoute.get(`${prefix}/products/:id`, authMiddleware, authorize('admin', 'support'),productController.show);
dashboardRoute.put(`${prefix}/products/:id`, authMiddleware, authorize('admin'),productController.update);
dashboardRoute.delete(`${prefix}/products/:id`, authMiddleware, authorize('admin'),productController.delete);
// orders
dashboardRoute.post(`${prefix}/orders`,authMiddleware, orderController.create);
dashboardRoute.get(`${prefix}/orders`,authMiddleware, orderController.index);
dashboardRoute.put(`${prefix}/orders/:id/update_status`,authMiddleware, authorize('admin', 'support'), orderController.updateStatus);
export default dashboardRoute;
