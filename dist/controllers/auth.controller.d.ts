import { AuthService } from '../services/auth.service';
import { User } from '../database/models/user.model';
import { FreeLance } from 'src/database/models/freeLance.model';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(user: User, freeLance: FreeLance, res: any): Promise<any>;
    login(user: User, res: any): Promise<any>;
}
