import { UserService } from './user.service';
import { Published } from 'src/database/models/Publish.model';
export declare class UserController {
    private readonly userservice;
    constructor(userservice: UserService);
    newPost(post: Published, req: any, res: any): Promise<{
        message: string;
        post: any;
    }>;
    getMyPost(req: any, res: any): Promise<any>;
    servicesOnPost(id: string, res: any): Promise<any>;
    freeLanceInfo(id: string, res: any): Promise<any>;
    rateFreeLance(id: string, rate: number, req: any, res: any): Promise<any>;
    acceptRequest(id: string, res: any): Promise<any>;
}
