import { User } from '../../database/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { FreeLance } from 'src/database/models/freeLance.model';
export declare class AuthService {
    private userModel;
    private FreeLacneModele;
    private readonly jwtService;
    constructor(userModel: typeof User, FreeLacneModele: typeof FreeLance, jwtService: JwtService);
    register(user: User, freeLance: FreeLance): Promise<{
        user: User;
        token: string;
    }>;
    validatePassword(email: string, password: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    login(user: User): Promise<string>;
    decodeToken(token: string): any;
    findById(id: number): Promise<User>;
}
