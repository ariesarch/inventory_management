import { model, Schema } from "mongoose"
import { IAdmin, ICustomer, ISupport, IUser } from "./interfaces/IUser"
import validator from "validator"
import ROLES from "../enum/roles";
import bcrypt from 'bcryptjs';

const options = { discriminatorKey: 'role', timestamps: true };

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name must be provided!'],
        minlength: 3
    },
    email: {
        type: String,
        trim: true,
        required: true, 
        unique: true,
        validate: [validator.isEmail,'Email must be provided!']
    },
    password: {
        type: String,
        trim: false,
        required: [true, 'Password must be provided!'],
        minlength: 8,
        select:false
    },
    role: { 
        type: String, 
        required: true, 
        enum: Object.values(ROLES),
        default: ROLES.CUSTOMER,
    }
},options)

// Middleware to hash password before saving
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// Method to compare password
// userSchema.methods.comparePassword = async function (candidatePassword: string) {
//     return await bcrypt.compare(candidatePassword, this.password);
// };
const UserModel = model<IUser>('User', UserSchema)
// Customer schema
const customerSchema = new Schema<ICustomer>({
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
    },
});

const CustomerModel = UserModel.discriminator<ICustomer>('Customer', customerSchema);


// admin schema
const adminSchema = new Schema<IAdmin>({});

const AdminModel = UserModel.discriminator<IAdmin>('Admin', adminSchema);

// Support schema
const supportSchema = new Schema<ISupport>({});

const SupportModel = UserModel.discriminator<ISupport>('Support', supportSchema);

UserSchema.pre<IUser>('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function(enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export { UserModel, CustomerModel, AdminModel, SupportModel };
