"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const paypal = require("paypal-rest-sdk");
const payment_model_1 = require("../../database/models/payment.model");
const service_model_1 = require("../../database/models/service.model");
let paymentService = class paymentService {
    constructor(PaymentModele, ServiceModel) {
        this.PaymentModele = PaymentModele;
        this.ServiceModel = ServiceModel;
        paypal.configure({
            mode: 'sandbox',
            client_id: 'AQVNOFKZjoN7p3xv0hQdlU7y20ZmNNn0XP7N35ZCdp_M9xq9yymLdCDW3UPaJmNtg1nHiJu1gYd6Iv17',
            client_secret: 'EEk4JuNoccfqae7UZSos_1tjsZ4LZ-kgD84LlRFL5FNXzaNmJEhQJDxP4KcAn23bJx9kEVoNlT8NfNKM',
        });
    }
    async createPayment(id, userId) {
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
                }
                else {
                    resolve(payment);
                }
            });
        });
    }
    async success(userId, serviceId) {
        const service = await this.ServiceModel.findByPk(serviceId);
        const payment = new payment_model_1.Payment({
            amount: service.price,
            userId: userId,
            freeLanceId: service.freelaneId,
            date: new Date()
        });
        const payments = await this.PaymentModele.create(payment);
        return true;
    }
};
paymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(payment_model_1.Payment)),
    __param(1, (0, sequelize_1.InjectModel)(service_model_1.Service)),
    __metadata("design:paramtypes", [Object, Object])
], paymentService);
exports.paymentService = paymentService;
//# sourceMappingURL=payments.service.js.map