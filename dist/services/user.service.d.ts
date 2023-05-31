import { User } from '../database/models/user.model';
import { Published } from 'src/database/models/Publish.model';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userModel;
    private publishModel;
    private readonly jwtService;
    constructor(userModel: typeof User, publishModel: typeof Published, jwtService: JwtService);
    createPost(published: Published, user: User): Promise<Published>;
    getMyPost(id: string): Promise<Published[]>;
}
