import { Model } from 'sequelize-typescript';
import { Posts } from './post.model';
import { FreeLance } from './freeLance.model';
import { Complaint } from './complaint.model';
export declare class Service extends Model<Service> {
    id: number;
    price: number;
    numDays: number;
    Sdate: Date;
    Edate: Date;
    filePath: string;
    isAccepted: boolean;
    publishedId: number;
    published: Posts;
    freelaneId: number;
    freelane: FreeLance;
    complaint: Complaint;
}
