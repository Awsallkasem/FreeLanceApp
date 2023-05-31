import { UserService } from '../services/user.service';
import { Published } from 'src/database/models/Publish.model';
export declare class UserController {
    private readonly userservice;
    constructor(userservice: UserService);
    newPost(post: Published, req: any, res: any): Promise<{
        message: string;
        post: any;
    }>;
    getMyPost(req: any): Promise<Published[]>;
}
