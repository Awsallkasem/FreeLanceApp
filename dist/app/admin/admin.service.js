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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("@nestjs/sequelize");
const licnse_model_1 = require("../../database/models/licnse.model");
const user_model_1 = require("../../database/models/user.model");
let AdminService = class AdminService {
    constructor(Usermodele, LicnseModel, jwtService) {
        this.Usermodele = Usermodele;
        this.LicnseModel = LicnseModel;
        this.jwtService = jwtService;
    }
    async showAllRequest() {
        const user = await this.Usermodele.findAll({
            where: { isActive: false, isReject: false, role: user_model_1.UserRole.FreeLnce }
        });
        if (user) {
            return user;
        }
        else
            return null;
    }
    async acceptRequest(id) {
        const user = await this.findUserByIs(id);
        const date = new Date();
        const nextMonth = date.getMonth();
        date.setMonth(nextMonth);
        user.Activatedat = date;
        user.isActive = true;
        return await user.save();
    }
    async rejectRequest(id) {
        const user = await this.findUserByIs(id);
        user.isReject = true;
        return await user.save();
    }
    async blockUser(id) {
        const user = await this.findUserByIs(id);
        if (user.role == user_model_1.UserRole.ADMIN) {
            throw new common_1.UnauthorizedException('access denied');
        }
        user.isBlocked = true;
        return await user.save();
    }
    async findUserByIs(id) {
        const user = await this.Usermodele.findOne({
            where: { id: id },
        });
        return user;
    }
    async updateLicnces(amount) {
        const licnse = await this.LicnseModel.findByPk(1);
        licnse.amount = amount;
        return await licnse.save();
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(licnse_model_1.Licens)),
    __metadata("design:paramtypes", [Object, Object, jwt_1.JwtService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map