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
exports.PayPalController = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("./payments.service");
const common_2 = require("@nestjs/common");
const global_exception_filter_1 = require("../../filters/global-exception.filter");
let PayPalController = class PayPalController {
    constructor(payPalService) {
        this.payPalService = payPalService;
    }
    async receiveMoney(packgId, res, req) {
        if (!packgId) {
            throw new common_1.BadRequestException('packgId is required');
        }
        res.redirect(await this.payPalService.receiveMoney(parseInt(packgId), req.body.user.id));
        return { message: 'Payment received successfully.' };
    }
    async sendMoney(amount, point, res, req) {
        if (!amount && !point) {
            throw new common_1.BadRequestException('amount is required');
        }
        const message = await this.payPalService.sendMoney(amount, point, req.body.user.id);
        return res.status(200).send({ message: message });
    }
    async success(res, req) {
        const payment = await this.payPalService.success(req);
        return res.status(201).json({ message: 'done' });
    }
    async showPackgs() {
        return this.payPalService.showPackgs();
    }
};
__decorate([
    (0, common_1.Get)('receive-money/:packgId'),
    __param(0, (0, common_1.Param)('packgId')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PayPalController.prototype, "receiveMoney", null);
__decorate([
    (0, common_2.Post)('send-money'),
    __param(0, (0, common_2.Body)('amount')),
    __param(1, (0, common_2.Body)('point')),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], PayPalController.prototype, "sendMoney", null);
__decorate([
    (0, common_1.Get)('success'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PayPalController.prototype, "success", null);
__decorate([
    (0, common_1.Get)('showPackgs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayPalController.prototype, "showPackgs", null);
PayPalController = __decorate([
    (0, common_1.UseFilters)(global_exception_filter_1.HttpExceptionFilter),
    (0, common_2.Controller)('api/payments/'),
    __metadata("design:paramtypes", [payments_service_1.paymentService])
], PayPalController);
exports.PayPalController = PayPalController;
//# sourceMappingURL=payments.controller.js.map