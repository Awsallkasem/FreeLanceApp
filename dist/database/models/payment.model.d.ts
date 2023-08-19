import { Model } from 'sequelize-typescript';
import { User } from './user.model';
export declare class Payment extends Model<Payment> {
    id: number;
    amount: number;
    date: Date;
    userId: number;
    user: User;
}
