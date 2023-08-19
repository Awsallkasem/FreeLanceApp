import { paymentService } from './payments.service';
export declare class PayPalController {
    private readonly payPalService;
    constructor(payPalService: paymentService);
    receiveMoney(amount: any, res: any, req: any): Promise<{
        message: string;
    }>;
    sendMoney(amount: any, res: any, req: any): Promise<any>;
    success(res: any, req: any): Promise<any>;
}
