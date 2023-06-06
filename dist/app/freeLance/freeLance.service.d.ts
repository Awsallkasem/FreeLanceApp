import { JwtService } from "@nestjs/jwt";
import { FreeLance } from "src/database/models/freeLance.model";
import { Service } from "src/database/models/service.model";
import { User } from "src/database/models/user.model";
export declare class FreeLanceService {
    private readonly UserModel;
    private readonly FreeLanceModel;
    private readonly ServiceModel;
    private readonly jwtService;
    constructor(UserModel: typeof User, FreeLanceModel: typeof FreeLance, ServiceModel: typeof Service, jwtService: JwtService);
    addService(service: Service, UserId: number, postId: number): Promise<Service>;
}
