import { UserModel } from '@/models/UserModel';
import { IUser } from '@/models/interfaces/IUser';
import { BaseRepository } from './BaseRepository';
class UserRepository extends BaseRepository<IUser> {
    constructor() {
        super(UserModel);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return this.model.findOne({ email }).select("+password");
    }
    // async findById(id: string): Promise<IUser | null> {
    //     return this.model.findById(id);
    // }
    findById(id: string) {
        return this.model.findById(id);  // Returning the query directly
    }


}

export default new UserRepository();
