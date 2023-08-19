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
exports.FreeLanceController = void 0;
const common_1 = require("@nestjs/common");
const service_model_1 = require("../../database/models/service.model");
const freeLance_service_1 = require("./freeLance.service");
const global_exception_filter_1 = require("../../filters/global-exception.filter");
let FreeLanceController = class FreeLanceController {
    constructor(freeLanceService) {
        this.freeLanceService = freeLanceService;
    }
    async getAllPost(res) {
        const posts = await this.freeLanceService.getAllPost();
        return res.status(200).json({ posts: posts });
    }
    async getPostInterstes(res) {
    }
    async getAllPostByCategory(category, res) {
        const posts = await this.freeLanceService.getAllPostByCategory(category);
        return res.status(200).json({ posts: posts });
    }
    async addService(id, service, req, res) {
        const createService = new service_model_1.Service(service);
        const newService = await this.freeLanceService.addService(createService.dataValues, req.body.user.id, parseInt(id));
        return res.status(201).json({ message: 'Service createred secussefully', service: newService });
    }
    async checkMyService(req, res) {
        const myService = await this.freeLanceService.checkMyService(req.body.user.id);
        return res.status(200).json({ service: myService });
    }
    async showAcceptedServices(req, res) {
        const services = await this.freeLanceService.showAcceptedServices(req.body.user.id);
        return res.status(200).json({ services: services });
    }
    async paymentInYear(year, res) {
        const payments = await this.freeLanceService.showYearMoney(parseInt(year));
        return res.status(200).json({ payment: payments });
    }
    async paymentInMont(month, res) {
        const payments = await this.freeLanceService.showMonthMony(parseInt(month));
        return res.status(200).json({ payment: payments });
    }
};
__decorate([
    (0, common_1.Get)('getAllPost'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "getAllPost", null);
__decorate([
    (0, common_1.Get)('getPostAboutInterstes'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "getPostInterstes", null);
__decorate([
    (0, common_1.Get)('getAllPostByCategory/:category'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "getAllPostByCategory", null);
__decorate([
    (0, common_1.Post)('addService/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, service_model_1.Service, Object, Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "addService", null);
__decorate([
    (0, common_1.Get)('checkMyService'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "checkMyService", null);
__decorate([
    (0, common_1.Get)('showAcceptedServices'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "showAcceptedServices", null);
__decorate([
    (0, common_1.Get)('paymentinYear/:year'),
    __param(0, (0, common_1.Param)('year')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "paymentInYear", null);
__decorate([
    (0, common_1.Get)('paymentinMonth/:month'),
    __param(0, (0, common_1.Param)('month')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "paymentInMont", null);
FreeLanceController = __decorate([
    (0, common_1.UseFilters)(global_exception_filter_1.HttpExceptionFilter),
    (0, common_1.Controller)('api/freeLace/'),
    __metadata("design:paramtypes", [freeLance_service_1.FreeLanceService])
], FreeLanceController);
exports.FreeLanceController = FreeLanceController;
//# sourceMappingURL=freeLance.controller.js.map