import { JwtService } from "@nestjs/jwt";
import { FreelanceCategory, Published } from "src/database/models/Publish.model";
import { FreeLance } from "src/database/models/freeLance.model";
import { Service } from "src/database/models/service.model";
import { User } from "src/database/models/user.model";
import { Payment } from "src/database/models/payment.model";
export declare class FreeLanceService {
    private readonly UserModel;
    private readonly FreeLanceModel;
    private readonly ServiceModel;
    private publishModel;
    private readonly PaymentModel;
    private readonly jwtService;
    constructor(UserModel: typeof User, FreeLanceModel: typeof FreeLance, ServiceModel: typeof Service, publishModel: typeof Published, PaymentModel: typeof Payment, jwtService: JwtService);
    getAllPost(): Promise<Published[]>;
    getAllPostByCategory(category: string): Promise<Published[]>;
    addService(service: Service, UserId: number, postId: number): Promise<Service>;
    checkMyService(id: number): Promise<Service[]>;
    showAcceptedServices(id: number): Promise<Service[]>;
    searchCategory(searchTerm: string): FreelanceCategory;
    showMonthMony(month: number): Promise<Payment[]>;
    showYearMoney(year: number): Promise<Payment[]>;
}
