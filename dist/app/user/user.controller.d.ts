import { UserService } from './user.service';
import { Posts } from 'src/database/models/post.model';
export declare class UserController {
    private readonly userservice;
    constructor(userservice: UserService);
    newPost(post: Posts, req: any, res: any): Promise<{
        message: string;
        post: any;
    }>;
    getMyPost(req: any, res: any): Promise<any>;
    servicesOnPost(id: string, res: any): Promise<any>;
    freeLanceInfo(id: string, res: any): Promise<any>;
    rateFreeLance(id: string, rate: number, req: any, res: any): Promise<any>;
    acceptRequest(id: string, res: any, req: any): Promise<any>;
    serchAboutFreeLance(res: any, Fname: string, Lname: string): Promise<any>;
    getAllCategory(res: any): Promise<any>;
    searchAboutCategory(name: string, res: any): Promise<any>;
    adddRequestOnPostPoint(id: string, req: any, res: any): Promise<any>;
    deletePost(id: string, res: any): Promise<any>;
    showMyRequests(req: any, res: any): Promise<any>;
    showPostpoint(res: any): Promise<any>;
    showPostpointByCategory(res: any, category: string): Promise<any>;
    addComplaint(req: any, res: any, serviceId: any, content: string): Promise<any>;
}
