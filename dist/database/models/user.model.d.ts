import { Model } from 'sequelize-typescript';
import { Posts } from './post.model';
import { FreeLance } from './freeLance.model';
import { Payment } from './payment.model';
import { PayAndRecive } from './payAndRecive.model';
import { Complaint } from './complaint.model';
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user",
    FreeLnce = "freelance"
}
export interface UserAttributes {
    id: number;
    role: UserRole;
    email: string;
    location: string;
    Fname: string;
    Lname: string;
    password: string;
    phone: string;
}
export declare class User extends Model<User> implements UserAttributes {
    id: number;
    role: UserRole;
    email: string;
    location: string;
    Fname: string;
    Lname: string;
    password: string;
    phone: string;
    walletBalance: number;
    point: number;
    isActive: boolean;
    isReject: boolean;
    isBlocked: boolean;
    Activatedat: Date;
    publisheds: Posts[];
    freeLances: FreeLance;
    ranks: Posts[];
    payments: Payment[];
    payAndRecive: PayAndRecive;
    complaint: Complaint;
    static statisticalsNumUser(year: number): Promise<any[]>;
    static statisticalsNumFreeLance(year: number): Promise<any[]>;
}
