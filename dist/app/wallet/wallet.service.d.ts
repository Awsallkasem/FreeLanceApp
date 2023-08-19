import { User } from 'src/database/models/user.model';
export declare class WalletService {
    private readonly userModel;
    constructor(userModel: typeof User);
    getBalance(userId: number): Promise<number>;
    deposit(userId: number, amount: number): Promise<number>;
    depositByPoint(userId: number, amount: number): Promise<number>;
    disposit(userId: number, amount: number): Promise<number>;
    transfer(fromUserId: number, toUserId: number, amount: number): Promise<{
        fromWalletBalance: number;
        toWalletBalance: number;
    }>;
}
