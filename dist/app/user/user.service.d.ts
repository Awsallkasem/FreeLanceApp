import { User } from '../../database/models/user.model';
import { Published } from 'src/database/models/Publish.model';
import { JwtService } from '@nestjs/jwt';
import { Service } from 'src/database/models/service.model';
export declare class UserService {
    private userModel;
    private publishModel;
    private readonly serviceModele;
    private readonly jwtService;
    constructor(userModel: typeof User, publishModel: typeof Published, serviceModele: typeof Service, jwtService: JwtService);
    createPost(published: Published, user: User): Promise<Published>;
    getMyPost(id: string): Promise<Published[]>;
    servicesOnPost(id: number): Promise<Service[]>;
}
