import { Payment } from 'src/database/models/payment.model';
import { User } from 'src/database/models/user.model';
import { Request } from 'express';
import { Payout } from 'src/database/models/payout.model';
import { FreeLance } from 'src/database/models/freeLance.model';
export declare class paymentService {
    private readonly payoutModele;
    private readonly UserModel;
    private readonly FreeLanceModel;
    private readonly logger;
    constructor(payoutModele: typeof Payout, UserModel: typeof User, FreeLanceModel: typeof FreeLance);
    receiveMoney(amount: number, userId: number): Promise<any>;
    sendMoney(amount: number, userId: number): Promise<string>;
    success(req: Request): Promise<Payment>;
}
