import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserRepository from '@/repositories/UserRepository';
import { IUser } from '@/models/interfaces/IUser';
import config from '@/config';
import { ApiError } from '@/utils';
class AuthService {
    private userRepository = UserRepository;
    generateToken(user: IUser): string {
        const jwtSecret = config.JWT_SECRET as string;
        return jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1d' });
    }

    async authenticateUser(email: string, password: string): Promise<{ user: IUser, token: string }> {
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user || !await this.isPasswordMatch(password, user.password)) {
                throw new ApiError(401, "Incorrect credentials");
            }
            const token = this.generateToken(user);
            return {
                user,
                token
            };
        } catch (error: any) {
            throw error;
        }
    }
    async registerUser(data: Partial<IUser>): Promise<{ user: IUser, token: string }> {
        try{
            data.password = await this.encryptPassword(data.password!)
            const user = await this.userRepository.create(data);
            return { user, token: this.generateToken(user) };
        } catch (error: any) {
            throw error;
        }
    }
    async encryptPassword (password: string)  {
        const encryptedPassword = await bcrypt.hash(password, 12);
        return encryptedPassword;
    };
    async isPasswordMatch(password: string, userPassword: string) {
    const result = await bcrypt.compare(password, userPassword);
    return result;
};


}

export default new AuthService();
