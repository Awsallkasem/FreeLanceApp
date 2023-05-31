import { Model } from 'sequelize-typescript';
import { Published } from './Publish.model';
export declare class Service extends Model<Service> {
    id: number;
    fileType: string;
    user: Published;
}
