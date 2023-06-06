import { AdminService } from 'src/app/admin/admin.service';
export declare class AdminContoller {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAllRequest(res: any): Promise<any>;
    acceptRequest(id: string, res: any): Promise<any>;
    rejectRequest(id: string, res: any): Promise<any>;
    blockUser(id: string, res: any): Promise<any>;
}
