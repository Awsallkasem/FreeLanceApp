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
const complaint_model_1 = require("../../database/models/complaint.model");
const freeLance_model_1 = require("../../database/models/freeLance.model");
const payAndRecive_model_1 = require("../../database/models/payAndRecive.model");
const service_model_1 = require("../../database/models/service.model");
const user_model_1 = require("../../database/models/user.model");
let AdminService = class AdminService {
    constructor(Usermodele, payAndReciveModele, complaintModele, freeLanceModele, jwtService) {
        this.Usermodele = Usermodele;
        this.payAndReciveModele = payAndReciveModele;
        this.complaintModele = complaintModele;
        this.freeLanceModele = freeLanceModele;
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
            throw new common_1.NotFoundException('there no data');
    }
    async acceptRequest(id) {
        const user = await this.findUserById(id);
        user.isActive = true;
        return await user.save();
    }
    async rejectRequest(id) {
        const user = await this.findUserById(id);
        user.isReject = true;
        return await user.save();
    }
    async blockUser(id) {
        const freeLance = await this.freeLanceModele.findByPk(id);
        if (!freeLance) {
            throw new common_1.NotFoundException();
        }
        const user = await this.findUserById(freeLance.userId);
        user.isBlocked = true;
        return await user.save();
    }
    async findUserById(id) {
        const user = await this.Usermodele.findOne({
            where: { id: id },
        });
        if (!user) {
            throw new common_1.NotFoundException('there no data');
        }
        return user;
    }
    async statisticalsCategoryWeekly() {
        const year = new Date();
        const statisticals = await this.payAndReciveModele.statisticalsCategoryweekly(year.getFullYear());
        if (!statisticals) {
            throw new common_1.NotFoundException('there no data');
        }
        return statisticals;
    }
    async statisticalsCategory() {
        const year = new Date();
        const statisticals = await this.payAndReciveModele.statisticalsCategory();
        if (!statisticals) {
            throw new common_1.NotFoundException('there no data');
        }
        return statisticals;
    }
    async statisticalsNumUser() {
        const year = new Date();
        const statisticals = await this.Usermodele.statisticalsNumUser(year.getFullYear());
        if (!statisticals) {
            throw new common_1.NotFoundException('there no data');
        }
        return statisticals;
    }
    async statisticalsNumFreeLance() {
        const year = new Date();
        const statisticals = await this.Usermodele.statisticalsNumFreeLance(year.getFullYear());
        if (!statisticals) {
            throw new common_1.NotFoundException('there no data');
        }
        return statisticals;
    }
    async statisticalsComplaint() {
        const statisticals = await this.complaintModele.statisticalComplaints();
        if (!statisticals) {
            throw new common_1.NotFoundException('there no data');
        }
        return statisticals;
    }
    async showComplaint() {
        const complaints = await this.complaintModele.findAll({
            include: [{
                    model: user_model_1.User,
                    attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
                },
                {
                    model: service_model_1.Service,
                    include: [{
                            model: freeLance_model_1.FreeLance,
                            include: [{
                                    model: user_model_1.User,
                                    attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
                                }]
                        }]
                }]
        });
        if (!complaints) {
            throw new common_1.NotFoundException('there no data');
        }
        return complaints;
    }
    async returnHisCoin(complaintId) {
        if (!complaintId) {
            throw new common_1.BadRequestException('enter required fields');
        }
        const complaints = await this.complaintModele.findOne({ where: { id: complaintId },
            include: [{
                    model: user_model_1.User,
                    attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
                },
                {
                    model: service_model_1.Service,
                    include: [{
                            model: freeLance_model_1.FreeLance,
                            include: [{
                                    model: user_model_1.User,
                                    attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
                                }]
                        }]
                }]
        });
        const user = await this.findUserById(complaints.userId);
        if (!user) {
            throw new common_1.NotFoundException('there no data');
        }
        user.walletBalance += complaints.service.price;
        return await user.save();
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(payAndRecive_model_1.PayAndRecive)),
    __param(2, (0, sequelize_1.InjectModel)(complaint_model_1.Complaint)),
    __param(3, (0, sequelize_1.InjectModel)(freeLance_model_1.FreeLance)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, jwt_1.JwtService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map