import { User } from '../database/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(user: User): Promise<{
        user: User;
        token: string;
    }>;
    validatePassword(email: string, password: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    login(user: User): Promise<string>;
    decodeToken(token: string): any;
    findById(id: number): Promise<User>;
}
