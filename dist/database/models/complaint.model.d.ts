import { Model } from 'sequelize-typescript';
import { User } from './user.model';
import { Service } from './service.model';
export declare class Complaint extends Model<Complaint> {
    id: number;
    content: string;
    serviceId: number;
    service: Service;
    userId: number;
    user: User;
    static statisticalComplaints(): Promise<any[]>;
}
