import { Model } from 'sequelize-typescript';
import { User } from './user.model';
import { FreeLance } from './freeLance.model';
export declare class Payment extends Model<Payment> {
    id: number;
    amount: number;
    date: Date;
    userId: number;
    user: User;
    freeLanceId: number;
    freeLance: FreeLance;
}
