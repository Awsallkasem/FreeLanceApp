import { WalletService } from './wallet.service';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    getBalance(id: number): Promise<number>;
    deposit(id: number, amount: number): Promise<number>;
    transfer(from: number, to: number, amount: number): Promise<{
        fromWalletBalance: number;
        toWalletBalance: number;
    }>;
}
