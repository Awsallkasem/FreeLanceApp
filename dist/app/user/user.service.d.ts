import { User } from '../../database/models/user.model';
import { Published } from 'src/database/models/Publish.model';
import { JwtService } from '@nestjs/jwt';
import { Service } from 'src/database/models/service.model';
import { FreeLance } from 'src/database/models/freeLance.model';
import { Rating } from 'src/database/models/rating.model';
export declare class UserService {
    private userModel;
    private freeLanceModel;
    private readonly ratingModele;
    private publishModel;
    private readonly serviceModele;
    private readonly jwtService;
    constructor(userModel: typeof User, freeLanceModel: typeof FreeLance, ratingModele: typeof Rating, publishModel: typeof Published, serviceModele: typeof Service, jwtService: JwtService);
    createPost(published: Published, user: User): Promise<Published>;
    getMyPost(id: string): Promise<Published[]>;
    servicesOnPost(id: number): Promise<Service[]>;
    showFreeLanceinfo(id: number): Promise<{
        freeLance: FreeLance;
        rate: any;
    }>;
    rateFreeLance(freeLanceId: number, userId: number, rate: number): Promise<number>;
    acceptRequest(id: number): Promise<Service>;
}
