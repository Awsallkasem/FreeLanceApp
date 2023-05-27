import { AuthService } from '../services/auth.service';
import { User } from '../database/models/user.model';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(user: User, res: any): Promise<any>;
    login(user: User, res: any): Promise<any>;
}
