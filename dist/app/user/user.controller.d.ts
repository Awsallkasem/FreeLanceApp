import { UserService } from './user.service';
import { Published } from 'src/database/models/Publish.model';
export declare class UserController {
    private readonly userservice;
    constructor(userservice: UserService);
    newPost(post: Published, req: any, res: any): Promise<{
        message: string;
        post: any;
    }>;
    getMyPost(req: any): Promise<Published[]>;
    servicesOnPost(id: string): Promise<import("../../database/models/service.model").Service[]>;
    freeLanceInfo(id: string): Promise<void>;
}
