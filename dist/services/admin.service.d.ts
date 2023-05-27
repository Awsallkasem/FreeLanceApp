import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/models/user.model';
import { Repository } from 'typeorm';
export declare class AdminService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    showAllRequest(): Promise<User | null>;
    acceptRequest(id: number): Promise<User>;
    rejectRequest(id: number): Promise<User>;
    blockUser(id: number): Promise<User>;
    findUserByIs(id: any): Promise<User>;
}
