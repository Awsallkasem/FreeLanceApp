import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as paypal from 'paypal-rest-sdk';
import { Payment } from 'src/database/models/payment.model';
import { Service } from 'src/database/models/service.model';

@Injectable()
export class paymentService {
    constructor(
        @InjectModel(Payment)
        private readonly PaymentModele: typeof Payment,
        @InjectModel(Service)
        private readonly ServiceModel: typeof Service,
    ) {
        paypal.configure({
            mode: 'sandbox', // or 'live' for production
            client_id: 'AQVNOFKZjoN7p3xv0hQdlU7y20ZmNNn0XP7N35ZCdp_M9xq9yymLdCDW3UPaJmNtg1nHiJu1gYd6Iv17',
            client_secret: 'EEk4JuNoccfqae7UZSos_1tjsZ4LZ-kgD84LlRFL5FNXzaNmJEhQJDxP4KcAn23bJx9kEVoNlT8NfNKM',
        });
    }

    async createPayment(id: number, userId: number): Promise<any> {
        const service = await this.ServiceModel.findByPk(id);
        const createPaymentJson = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            redirect_urls: {
                return_url: `http://localhost:3000/payments/success/${id}/${userId}`,
                cancel_url: 'http://localhost:3000/payments/cancel',
            },
            transactions: [
                {
                    item_list: {
                        items: [
                            {
                                name: service.id,
                                sku: '001',
                                price: service.price.toString(),
                                currency: 'USD',
                                quantity: 1,
                            },
                        ],
                    },
                    amount: {
                        currency: 'USD',
                        total: service.price.toString(),
                    },
                    description: 'Payment description',
                },
            ],
        };

        return new Promise((resolve, reject) => {
            paypal.payment.create(createPaymentJson, (error, payment) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(payment);
                }
            });
        });
    }
    async success(userId, serviceId) {
        const service=await this.ServiceModel.findByPk(serviceId);

        const payment=new Payment({
            amount:service.price,
            userId:userId,
            freeLanceId:service.freelaneId,
            date:new Date()
        });
       const payments=await this.PaymentModele.create(payment);
       return true;
    }

}
