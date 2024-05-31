import { Request, Response, NextFunction, ErrorRequestHandler, RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import config from '@/config';
import UserRepository from '@/repositories/UserRepository';
import { ApiError } from "@/utils";
interface AuthRequest extends Request {
    user?: any;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({ status:401, error: 'Not authorized, no token' });
    }
    try {
         const decoded: any = jwt.verify(token, config.JWT_SECRET as string);
        req.user = await UserRepository.findById(decoded.id).select('-password').exec();
        if (!req.user) {
            return res.status(401).json({ status:401, error: 'Not authorized, user not found' });
        }
        next();
    } catch (err) {
        res.status(401).json({ status: 401, error: 'Not authorized, token failed' });
    }
};

const authorize = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        let error: any;
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'User role not authorized' });
        }
        next();
    };
};

export { authMiddleware, authorize };
