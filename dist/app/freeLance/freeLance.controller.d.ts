import { Service } from 'src/database/models/service.model';
import { FreeLanceService } from 'src/app/freeLance/freeLance.service';
import { postWithPoint } from 'src/database/models/postWithPoint.model';
export declare class FreeLanceController {
    private readonly freeLanceService;
    constructor(freeLanceService: FreeLanceService);
    getAllPost(res: any): Promise<any>;
    getAllPostByCategory(category: string, res: any): Promise<any>;
    addService(id: string, service: Service, req: any, res: any): Promise<any>;
    checkMyService(req: any, res: any): Promise<any>;
    showAcceptedServices(req: any, res: any): Promise<any>;
    paymentInMont(res: any, req: any): Promise<any>;
    serchAboutFreeLance(res: any, Fname: string, Lname: string): Promise<any>;
    attachFile(serviceId: string, file: string, fileType: string, res: any): Promise<any>;
    getAllCategory(res: any): Promise<any>;
    searchAboutCategory(name: string, res: any): Promise<any>;
    deleteIneterest(id: string, res: any, req: any): Promise<any>;
    addIneterest(id: string, res: any, req: any): Promise<any>;
    showMyInterest(res: any, req: any): Promise<any>;
    showPostAboutInterest(res: any, req: any): Promise<any>;
    addPost(req: any, res: any, post: postWithPoint): Promise<any>;
    deletePost(id: string, res: any): Promise<any>;
    showUserRequest(id: string, res: any): Promise<any>;
    acceptUserRequest(id: string, res: any): Promise<any>;
    uploadPhotoOrReplace(photo: string, req: any, res: any): Promise<any>;
    rejectRequest(id: string, res: any): Promise<any>;
    attachFileToPostPoint(userRequestId: string, file: string, fileType: string, res: any): Promise<any>;
}
