import { AdminService } from 'src/app/admin/admin.service';
export declare class AdminContoller {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAllRequest(res: any): Promise<any>;
    acceptRequest(id: string, res: any): Promise<any>;
    rejectRequest(id: string, res: any): Promise<any>;
    blockUser(id: string, res: any): Promise<any>;
    statisticalsCategoryWeekly(res: any): Promise<any>;
    statisticalsCategory(res: any): Promise<any>;
    statisticalsNumUser(res: any): Promise<any>;
    statisticalsNumFreeLance(res: any): Promise<any>;
    showComplaint(): Promise<import("../../database/models/complaint.model").Complaint[]>;
    statisticalsComplaint(): Promise<any[]>;
    returnHisCoin(complaintId: number, res: any): Promise<import("../../database/models/user.model").User>;
}
