import { Model } from 'sequelize-typescript';
import { User } from './user.model';
import { Service } from './service.model';
export declare class Published extends Model<Published> {
    id: number;
    content: string;
    fileName: string;
    fileType: string;
    services: Service[];
    userId: number;
    user: User;
    static IsRequired(instance: Published): Promise<void>;
}
