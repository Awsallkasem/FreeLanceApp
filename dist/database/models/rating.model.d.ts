import { Model } from 'sequelize-typescript';
import { User } from './user.model';
import { FreeLance } from './freeLance.model';
export declare class Rating extends Model<Rating> {
    id: number;
    rating: number;
    userId: number;
    user: User;
    freelaneId: number;
    freelane: FreeLance;
}
