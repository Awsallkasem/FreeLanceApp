import { paymentService } from './payments.service';
export declare class PayPalController {
    private readonly payPalService;
    constructor(payPalService: paymentService);
    receiveMoney(packgId: any, res: any, req: any): Promise<{
        message: string;
    }>;
    sendMoney(amount: number, point: number, res: any, req: any): Promise<any>;
    success(res: any, req: any): Promise<any>;
    showPackgs(): Promise<import("../../database/models/packgs.model").Packgs[]>;
}
