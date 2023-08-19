import { Model } from 'sequelize-typescript';
import { postWithPoint } from './postWithPoint.model';
import { UserRequest } from './userRequest.model';
export declare class StaggingToPoint extends Model<StaggingToPoint> {
    id: number;
    isPaid: boolean;
    isAttached: boolean;
    postId: number;
    post: postWithPoint;
    userRequestId: number;
    userRequest: UserRequest;
}
