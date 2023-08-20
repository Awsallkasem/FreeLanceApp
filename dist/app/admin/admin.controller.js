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
exports.AdminContoller = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const global_exception_filter_1 = require("../../filters/global-exception.filter");
let AdminContoller = class AdminContoller {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getAllRequest(res) {
        const requests = await this.adminService.showAllRequest();
        if (!requests) {
            throw new common_1.NotFoundException;
        }
        return res.status(200).json({ data: requests });
    }
    async acceptRequest(id, res) {
        const accepted = await this.adminService.acceptRequest(parseInt(id));
        return res.status(202).json({ data: accepted });
    }
    async rejectRequest(id, res) {
        const rejected = await this.adminService.rejectRequest(parseInt(id));
        return res.status(200).json({ data: rejected });
    }
    async blockUser(id, res) {
        const blocked = await this.adminService.blockUser(parseInt(id));
        return res.status(200).json({ data: blocked });
    }
    async statisticalsCategoryWeekly(res) {
        const statisticals = await this.adminService.statisticalsCategoryWeekly();
        return res.status(200).json({ data: statisticals });
    }
    async statisticalsCategory(res) {
        const statisticals = await this.adminService.statisticalsCategory();
        return res.status(200).json({ data: statisticals });
    }
    async statisticalsNumUser(res) {
        const statisticals = await this.adminService.statisticalsNumUser();
        return res.status(200).json({ data: statisticals });
    }
    async statisticalsNumFreeLance(res) {
        const statisticals = await this.adminService.statisticalsNumFreeLance();
        return res.status(200).json({ data: statisticals });
    }
    async showComplaint() {
        return await this.adminService.showComplaint();
    }
    async statisticalsComplaint() {
        return await this.adminService.statisticalsComplaint();
    }
    async returnHisCoin(complaintId, res) {
        const complaintResult = await this.adminService.returnHisCoin(complaintId);
        return complaintResult;
    }
};
__decorate([
    (0, common_1.Get)('/ShowAllRequest'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminContoller.prototype, "getAllRequest", null);
__decorate([
    (0, common_1.Put)('/acceptRequest/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminContoller.prototype, "acceptRequest", null);
__decorate([
    (0, common_1.Put)('/rejectRequest/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminContoller.prototype, "rejectRequest", null);
__decorate([
    (0, common_1.Put)('/blockUser/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminContoller.prototype, "blockUser", null);
__decorate([
    (0, common_1.Get)('statisticalsCategoryWeekly'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminContoller.prototype, "statisticalsCategoryWeekly", null);
__decorate([
    (0, common_1.Get)('statisticalsCategory'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminContoller.prototype, "statisticalsCategory", null);
__decorate([
    (0, common_1.Get)('statisticalsNumUser'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminContoller.prototype, "statisticalsNumUser", null);
__decorate([
    (0, common_1.Get)('statisticalsNumFreeLance'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminContoller.prototype, "statisticalsNumFreeLance", null);
__decorate([
    (0, common_1.Get)('showComplaint'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminContoller.prototype, "showComplaint", null);
__decorate([
    (0, common_1.Get)('statisticalsComplaint'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminContoller.prototype, "statisticalsComplaint", null);
__decorate([
    (0, common_1.Post)('returnHisCoin'),
    __param(0, (0, common_1.Body)('complaintId')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdminContoller.prototype, "returnHisCoin", null);
AdminContoller = __decorate([
    (0, common_1.UseFilters)(global_exception_filter_1.HttpExceptionFilter),
    (0, common_1.Controller)('api/admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminContoller);
exports.AdminContoller = AdminContoller;
//# sourceMappingURL=admin.controller.js.map