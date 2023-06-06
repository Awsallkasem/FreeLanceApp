import { Model } from 'sequelize-typescript';
import { Published } from './Publish.model';
import { FreeLance } from './freeLance.model';
export declare class Service extends Model<Service> {
    id: number;
    price: number;
    numDays: number;
    date: Date;
    publishedId: number;
    published: Published;
    freelaneId: number;
    freelane: FreeLance;
}
