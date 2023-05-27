import { Model } from 'sequelize-typescript';
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user",
    FreeLnce = "freelance",
    SuperAdmin = "superadmin"
}
export declare enum JobTittle {
    BackEndDeveloper = "backend-developer",
    FrontEndDeveloper = "frontend-developer",
    SystemAnalyzer = "system_analyzer"
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
    isActive: boolean;
    isReject: boolean;
    isBlocked: boolean;
    link: string;
    jobTittle: JobTittle;
    static IsRequired(instance: User): Promise<void>;
}
