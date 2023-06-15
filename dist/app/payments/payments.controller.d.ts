import { paymentService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentService;
    constructor(paymentService: paymentService);
    createPayment(id: string, res: any, req: any): Promise<any>;
    success(serviceId: string, res: any, userId: string): Promise<any>;
    cancel(res: any): Promise<any>;
}
