import { Document } from "mongoose"
import ROLES from "../../enum/roles"

// Base User interface
export interface IUser extends Document {
    name: string,
    email: string,
    role: ROLES,
    password: string,
    matchPassword(enteredPassword: string): Promise<boolean>
    createdAt: Date,
    updatedAt: Date
}
// Address interface for customers
export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}
// Customer-specific interface extending base User
export interface ICustomer extends IUser {
    role: ROLES.CUSTOMER;
    address: Address;
}

// Admin-specific interface extending base User
export interface IAdmin extends IUser {
    role: ROLES.ADMIN;
}

// Support-specific interface extending base User
export interface ISupport extends IUser {
    role: ROLES.SUPPORT;
}
// Union type for all possible User types
export type UserDocument = ICustomer | IAdmin | ISupport;
