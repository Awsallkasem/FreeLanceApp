import { User } from '../database/models/user.model';
import { Repository } from 'typeorm';
export declare class UserService {
    private userModel;
    private readonly userRepository;
    constructor(userModel: typeof User, userRepository: Repository<User>);
    createUser(user: User): Promise<User>;
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    update(id: number, user: User): Promise<[number, User[]]>;
    delete(id: number): Promise<number>;
}
