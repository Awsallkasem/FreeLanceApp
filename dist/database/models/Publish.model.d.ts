import { Model } from 'sequelize-typescript';
import { User } from './user.model';
export declare class Published extends Model<Published> {
    id: number;
    content: string;
    fileName: string;
    fileType: string;
    userId: number;
    user: User;
    static IsRequired(instance: Published): Promise<void>;
}
