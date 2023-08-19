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
var paymentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const payment_model_1 = require("../../database/models/payment.model");
const user_model_1 = require("../../database/models/user.model");
const axios_1 = require("axios");
const payout_model_1 = require("../../database/models/payout.model");
const freeLance_model_1 = require("../../database/models/freeLance.model");
class DataForBayment {
    static setAmount(amount) {
        this.amount = amount;
    }
    static setUserId(userId) {
        this.userId = userId;
    }
}
let paymentService = paymentService_1 = class paymentService {
    constructor(payoutModele, UserModel, FreeLanceModel) {
        this.payoutModele = payoutModele;
        this.UserModel = UserModel;
        this.FreeLanceModel = FreeLanceModel;
        this.logger = new common_1.Logger(paymentService_1.name);
    }
    async receiveMoney(amount, userId) {
        var _a;
        const authHeader = Buffer.from('AQ0lkpBSIK9roOaQe3hx2RBpwp4B4J0Pg9hf8qNma4ldJ6Ed1DbYU7i_YnvW0DaS0XlB0kiRUkYKegbA:EHxX5I1KHvgn88vahZNJstKK-6Nh-z7Kb0865JohnAb-nFciadAR2fOfgKob9ccv1qJYZJqE8i3F7LA0').toString('base64');
        const config = {
            headers: {
                Authorization: `Basic ${authHeader}`,
                'Content-Type': 'application/json',
            },
        };
        const paymentRequestBody = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            transactions: [
                {
                    amount: {
                        total: amount.toString(),
                        currency: 'USD',
                    },
                    description: 'Payment for your order',
                },
            ],
            redirect_urls: {
                return_url: 'http://localhost:3000/api/payments/success',
                cancel_url: 'http://localhost:3000/api/payments/cancel',
            },
        };
        try {
            const response = await axios_1.default.post('https://api.sandbox.paypal.com/v1/payments/payment', paymentRequestBody, config);
            const approvalLink = response.data.links.find((link) => link.rel === 'approval_url');
            if (approvalLink) {
                return approvalLink.href;
            }
            else {
                throw new Error('Failed to obtain PayPal approval link.');
            }
        }
        catch (error) {
            console.error('PayPal payment initiation error:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            throw new Error('Failed to initiate PayPal payment.');
        }
    }
    async sendMoney(amount, userId) {
        var _a;
        const user = await this.UserModel.findOne({ where: { id: userId } });
        const freeLance = await this.FreeLanceModel.findOne({ where: { userId: user.id } });
        if (amount > user.walletBalance) {
            throw new common_1.BadRequestException(`your wallet balance is ${user.walletBalance} less than ${amount}`);
        }
        if (amount < 5) {
            throw new common_1.BadRequestException('amount should be 5 or greater than');
        }
        if (!freeLance) {
            throw new common_1.NotFoundException("fnot fouund");
        }
        const acttuallMoney = amount - Math.ceil(amount * 0.05);
        const authHeader = Buffer.from('AQ0lkpBSIK9roOaQe3hx2RBpwp4B4J0Pg9hf8qNma4ldJ6Ed1DbYU7i_YnvW0DaS0XlB0kiRUkYKegbA:EHxX5I1KHvgn88vahZNJstKK-6Nh-z7Kb0865JohnAb-nFciadAR2fOfgKob9ccv1qJYZJqE8i3F7LA0').toString('base64');
        const config = {
            headers: {
                Authorization: `Basic ${authHeader}`,
                'Content-Type': 'application/json',
            },
        };
        const payoutRequestBody = {
            sender_batch_header: {
                recipient_type: 'EMAIL',
                email_message: 'Payment from Ego',
                note: 'Enjoy your payment',
            },
            items: [
                {
                    recipient_type: 'EMAIL',
                    amount: {
                        value: acttuallMoney.toString(),
                        currency: 'USD',
                    },
                    receiver: user.email,
                    note: 'Thank you for your service',
                },
            ],
        };
        try {
            const response = await axios_1.default.post('https://api.sandbox.paypal.com/v1/payments/payouts', payoutRequestBody, config);
            if (response.status == 201) {
                const payout = new payout_model_1.Payout();
                payout.amount = acttuallMoney;
                payout.freeLanceId = freeLance.id;
                payout.date = new Date();
                user.walletBalance -= amount;
                await user.save();
                await this.payoutModele.create(payout.dataValues);
            }
            return `you recive of ${acttuallMoney} USD from${'my app'} completed successfully. Payout ID: ${response.data.batch_header.payout_batch_id}`;
        }
        catch (error) {
            console.error('PayPal payout error:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            throw new Error('Failed to process the payout.');
        }
    }
    async success(req) {
        if (!DataForBayment.userId || !DataForBayment.amount) {
            return;
        }
        const user = await this.UserModel.findOne({ where: { id: DataForBayment.userId } });
        user.walletBalance += DataForBayment.amount;
        await user.save();
        const payment = new payment_model_1.Payment();
        payment.amount = DataForBayment.amount;
        payment.userId = DataForBayment.userId;
        payment.date = new Date();
        await payment.save();
        return payment;
    }
};
paymentService = paymentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(payout_model_1.Payout)),
    __param(1, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(2, (0, sequelize_1.InjectModel)(freeLance_model_1.FreeLance)),
    __metadata("design:paramtypes", [Object, Object, Object])
], paymentService);
exports.paymentService = paymentService;
//# sourceMappingURL=payments.service.js.map