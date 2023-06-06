import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/models/user.model';
export declare class AdminService {
    private readonly Usermodele;
    private readonly jwtService;
    constructor(Usermodele: typeof User, jwtService: JwtService);
    showAllRequest(): Promise<any | null>;
    acceptRequest(id: number): Promise<User>;
    rejectRequest(id: number): Promise<User>;
    blockUser(id: number): Promise<User>;
    findUserByIs(id: any): Promise<User>;
}
