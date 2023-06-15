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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("./payments.service");
let PaymentsController = class PaymentsController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async createPayment(id, res, req) {
        try {
            const payment = await this.paymentService.createPayment(parseInt(id), req.body.user.id);
            for (var index = 0; index < payment.links.length; index++) {
                if (payment.links[index].rel === 'approval_url') {
                    res.redirect(payment.links[index].href);
                }
            }
            return payment;
        }
        catch (error) {
            console.error(error);
            throw new Error('Payment creation failed');
        }
    }
    async success(serviceId, res, userId) {
        const payment = await this.paymentService.success(parseInt(userId), parseInt(serviceId));
        return res.status(201).json({ message: 'done' });
    }
    async cancel(res) {
        return res.status(200).jsone({ message: 'canceled' });
    }
};
__decorate([
    (0, common_1.Get)('create/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Get)('success/:serviceId/:userId'),
    __param(0, (0, common_1.Param)('serviceId')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "success", null);
__decorate([
    (0, common_1.Get)('cancel'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "cancel", null);
PaymentsController = __decorate([
    (0, common_1.Controller)('api/payments/'),
    __metadata("design:paramtypes", [payments_service_1.paymentService])
], PaymentsController);
exports.PaymentsController = PaymentsController;
//# sourceMappingURL=payments.controller.js.map