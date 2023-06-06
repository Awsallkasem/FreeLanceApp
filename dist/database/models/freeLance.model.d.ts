import { Model } from 'sequelize-typescript';
import { User } from './user.model';
import { Rank } from './rank.model';
import { Service } from './service.model';
export declare enum JobTittle {
    BackEndDeveloper = "backend-developer",
    FrontEndDeveloper = "frontend-developer",
    SystemAnalyzer = "system_analyzer"
}
export declare class FreeLance extends Model<FreeLance> {
    id: number;
    photoName: string;
    photoType: string;
    link: string;
    jobTittle: JobTittle;
    rank: number;
    number: number;
    userId: number;
    user: User;
    ranks: Rank[];
    services: Service[];
}
