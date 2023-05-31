import { Model } from 'sequelize-typescript';
import { User } from './user.model';
import { FreeLance } from './freeLance.model';
export declare class Rank extends Model<Rank> {
    id: number;
    rank: number;
    userId: number;
    user: User;
    freelaneId: number;
    freelane: FreeLance;
}
