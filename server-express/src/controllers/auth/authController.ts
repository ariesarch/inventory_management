import { Request, Response } from 'express';
import AuthService from '@/services/AuthService';
import { AuthRequest } from '@/models/interfaces/AuthRequest';
class AuthController {
    register = async (req: Request, res: Response): Promise<void> => {
        const { name, email, password, role } = req.body;
        try {
            const { user, token } = await AuthService.registerUser({ name, email, password, role });
            res.status(201).json({ user, token });
        } catch (error:any) {
            res.status(error.statusCode || 500).json({
                status: error.statusCode || 500,
                message: error.message
            });
        }
    };

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const { user, token } = await AuthService.authenticateUser(email, password);
            res.status(200).json({
                message: "Successfully logged in",
                user,
                token
            });
        } catch (error: any) {
            res.status(error.statusCode || 400).json({
                status: error.statusCode || 400,
                message: error.message
            });
        }
    };

    async logout(req: AuthRequest, res: Response) {
    try {
        // res.clearCookie('auth_token')
        res.status(200).json({
            message: "Successfully logged out",
        });
    } catch (error:any) {
            res.status(500).json({ message: 'Logout failed', error: error.message });
        }
    }
}
export default new AuthController();
