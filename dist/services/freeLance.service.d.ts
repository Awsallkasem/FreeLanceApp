import { JwtService } from "@nestjs/jwt";
import { FreeLance } from "src/database/models/freeLance.model";
import { User } from "src/database/models/user.model";
export declare class FreeLanceService {
    private readonly UserModel;
    private readonly FreeLanceModel;
    private readonly jwtService;
    constructor(UserModel: typeof User, FreeLanceModel: typeof FreeLance, jwtService: JwtService);
    addService(freeLAnce: FreeLance): Promise<void>;
}
