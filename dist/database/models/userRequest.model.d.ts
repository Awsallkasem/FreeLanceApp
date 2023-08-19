import { Model } from 'sequelize-typescript';
import { User } from './user.model';
import { postWithPoint } from './postWithPoint.model';
import { StaggingToPoint } from './staggingToPoint.model';
export declare class UserRequest extends Model<UserRequest> {
    id: number;
    isAcceppted: boolean;
    isRejected: boolean;
    filePath: string;
    userId: number;
    user: User;
    postId: number;
    post: postWithPoint;
    stagging: StaggingToPoint;
}
