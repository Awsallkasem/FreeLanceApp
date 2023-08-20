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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("../../database/models/user.model");
let WalletService = class WalletService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getBalance(userId) {
        const user = await this.userModel.findOne({ where: { id: userId } });
        return user.walletBalance;
    }
    async deposit(userId, amount) {
        const user = await this.userModel.findOne({ where: { id: userId } });
        user.walletBalance += amount;
        await user.save();
        return user.walletBalance;
    }
    async depositByPoint(userId, amount) {
        const user = await this.userModel.findOne({ where: { id: userId } });
        user.point += amount;
        await user.save();
        return user.point;
    }
    async disposit(userId, amount) {
        const user = await this.userModel.findOne({ where: { id: userId } });
        user.walletBalance -= amount;
        user.point += amount;
        await user.save();
        return user.walletBalance;
    }
};
WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map