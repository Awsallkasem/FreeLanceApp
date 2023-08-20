import { Model } from 'sequelize-typescript';
import { User } from './user.model';
import { Rating } from './rating.model';
import { Service } from './service.model';
import { Payout } from './payout.model';
import { postWithPoint } from './postWithPoint.model';
import { PayAndRecive } from './payAndRecive.model';
export declare enum JobTittle {
    BackEndDeveloper = "backend-developer",
    FrontEndDeveloper = "frontend-developer",
    SystemAnalyzer = "system_analyzer",
    Designer = "designer",
    Writer = "writer",
    SocialMediaInf = "social_media_inf",
    ContentCreator = "content_creator"
}
export declare class FreeLance extends Model<FreeLance> {
    id: number;
    photoName: string;
    link: string;
    jobTittle: JobTittle;
    userId: number;
    rate: number;
    user: User;
    rating: Rating[];
    payouts: Payout[];
    services: Service[];
    postPoint: postWithPoint[];
    payAndRecive: PayAndRecive;
    calculateRating(): Promise<number>;
}
