import { IUser } from "./IUser";
import { Request as ExpressRequest } from 'express';

export interface AuthRequest extends ExpressRequest {
    user?: IUser; // Add the user property to the custom interface
}