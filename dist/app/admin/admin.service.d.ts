import { JwtService } from '@nestjs/jwt';
import { Licens } from 'src/database/models/licnse.model';
import { User } from 'src/database/models/user.model';
export declare class AdminService {
    private readonly Usermodele;
    private LicnseModel;
    private readonly jwtService;
    constructor(Usermodele: typeof User, LicnseModel: typeof Licens, jwtService: JwtService);
    showAllRequest(): Promise<any | null>;
    acceptRequest(id: number): Promise<User>;
    rejectRequest(id: number): Promise<User>;
    blockUser(id: number): Promise<User>;
    findUserByIs(id: any): Promise<User>;
    updateLicnces(amount: number): Promise<Licens>;
}
