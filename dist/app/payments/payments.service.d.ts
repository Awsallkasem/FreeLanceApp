import { Payment } from 'src/database/models/payment.model';
import { User } from 'src/database/models/user.model';
import { Request } from 'express';
import { Payout } from 'src/database/models/payout.model';
import { FreeLance } from 'src/database/models/freeLance.model';
import { Packgs } from 'src/database/models/packgs.model';
export declare class paymentService {
    private readonly payoutModele;
    private readonly UserModel;
    private readonly FreeLanceModel;
    private readonly packgsModele;
    constructor(payoutModele: typeof Payout, UserModel: typeof User, FreeLanceModel: typeof FreeLance, packgsModele: typeof Packgs);
    receiveMoney(packgId: number, userId: number): Promise<any>;
    sendMoney(amount: number, point: number, userId: number): Promise<string>;
    success(req: Request): Promise<Payment>;
    showPackgs(): Promise<Packgs[]>;
}
