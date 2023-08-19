import { Model } from 'sequelize-typescript';
import { Service } from './service.model';
import { User } from './user.model';
export declare class Stagging extends Model<Stagging> {
    id: number;
    isPaid: boolean;
    isAttached: boolean;
    serviceId: number;
    service: Service;
    userId: number;
    user: User;
}
