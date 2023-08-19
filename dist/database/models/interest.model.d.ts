import { Model } from 'sequelize-typescript';
import { FreeLance } from './freeLance.model';
export declare class Ineterest extends Model<Ineterest> {
    id: number;
    categor: string;
    freelaneId: number;
    freelane: FreeLance;
}
