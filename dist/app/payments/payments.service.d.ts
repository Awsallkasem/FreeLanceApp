import { Payment } from 'src/database/models/payment.model';
import { Service } from 'src/database/models/service.model';
export declare class paymentService {
    private readonly PaymentModele;
    private readonly ServiceModel;
    constructor(PaymentModele: typeof Payment, ServiceModel: typeof Service);
    createPayment(id: number, userId: number): Promise<any>;
    success(userId: any, serviceId: any): Promise<boolean>;
}
