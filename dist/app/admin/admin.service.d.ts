import { JwtService } from '@nestjs/jwt';
import { Complaint } from 'src/database/models/complaint.model';
import { FreeLance } from 'src/database/models/freeLance.model';
import { PayAndRecive } from 'src/database/models/payAndRecive.model';
import { User } from 'src/database/models/user.model';
export declare class AdminService {
    private readonly Usermodele;
    private readonly payAndReciveModele;
    private readonly complaintModele;
    private readonly freeLanceModele;
    private readonly jwtService;
    constructor(Usermodele: typeof User, payAndReciveModele: typeof PayAndRecive, complaintModele: typeof Complaint, freeLanceModele: typeof FreeLance, jwtService: JwtService);
    showAllRequest(): Promise<any | null>;
    acceptRequest(id: number): Promise<User>;
    rejectRequest(id: number): Promise<User>;
    blockUser(id: number): Promise<User>;
    findUserById(id: any): Promise<User>;
    statisticalsCategoryWeekly(): Promise<any[]>;
    statisticalsCategory(): Promise<any[]>;
    statisticalsNumUser(): Promise<any[]>;
    statisticalsNumFreeLance(): Promise<any[]>;
    statisticalsComplaint(): Promise<any[]>;
    showComplaint(): Promise<Complaint[]>;
    returnHisCoin(complaintId: number): Promise<User>;
}
