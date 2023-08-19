import { Model } from 'sequelize-typescript';
import { User } from './user.model';
import { Rating } from './rating.model';
import { Service } from './service.model';
import { Payout } from './payout.model';
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
    photoType: string;
    link: string;
    jobTittle: JobTittle;
    userId: number;
    user: User;
    rating: Rating[];
    payouts: Payout[];
    services: Service[];
    calculateRating(): Promise<number>;
}
