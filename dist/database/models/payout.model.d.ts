import { Model } from 'sequelize-typescript';
import { FreeLance } from './freeLance.model';
export declare class Payout extends Model<Payout> {
    id: number;
    amount: number;
    date: Date;
    freeLanceId: number;
    freeLance: FreeLance;
}
