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
const postWithPoint_model_1 = require("../../database/models/postWithPoint.model");
let FreeLanceController = class FreeLanceController {
    constructor(freeLanceService) {
        this.freeLanceService = freeLanceService;
    }
    async getAllPost(res) {
        const posts = await this.freeLanceService.getAllPost();
        return res.status(200).json({ posts: posts });
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
    async paymentInMont(res, req) {
        const year = new Date();
        const statisticals = await this.freeLanceService.showstatisticalsinyear(year.getFullYear(), req.body.user.id);
        return res.status(200).json({ statisticals: statisticals });
    }
    async serchAboutFreeLance(res, Fname, Lname) {
        const freeLace = await this.freeLanceService.searchAboutFreeLance(Fname, Lname);
        return res.status(200).json({ date: freeLace });
    }
    async attachFile(serviceId, file, fileType, res) {
        const isDone = await this.freeLanceService.attachFile(file, fileType, parseInt(serviceId));
        return res.status(200).json({ message: "is done" });
    }
    async getAllCategory(res) {
        const data = await this.freeLanceService.showAllCategory();
        return res.status(200).json({ data: data });
    }
    async searchAboutCategory(name, res) {
        const data = await this.freeLanceService.searchAboutCategory(name);
        return res.status(200).json({ data: data });
    }
    async deleteIneterest(id, res, req) {
        const data = await this.freeLanceService.deleteIneterest(parseInt(id), req.body.user.id);
        return res.status(200).json({ data: data });
    }
    async addIneterest(id, res, req) {
        const data = await this.freeLanceService.addIneterest(parseInt(id), req.body.user.id);
        return res.status(200).json({ data: data });
    }
    async showMyInterest(res, req) {
        return res.status(200).json({ date: await this.freeLanceService.showMyInterest(req.body.user.id) });
    }
    async showPostAboutInterest(res, req) {
        const posts = await this.freeLanceService.showPostAboutInterest(req.body.user.id);
        return res.status(200).json({ data: posts });
    }
    async addPost(req, res, post) {
        const createPost = new postWithPoint_model_1.postWithPoint(post);
        const newPost = await this.freeLanceService.addPost(createPost.dataValues, req.body.user.id);
        return res.status(201).json({ message: 'post added successfully', data: newPost });
    }
    async deletePost(id, res) {
        const del = await this.freeLanceService.deletePost(parseInt(id));
        return res.status(200).json({ data: "done" });
    }
    async showUserRequest(id, res) {
        const userRequest = await this.freeLanceService.showUserRequest(parseInt(id));
        return res.status(200).json({ data: userRequest });
    }
    async acceptUserRequest(id, res) {
        const accepted = await this.freeLanceService.acceptUserRequest(parseInt(id));
        return res.status(200).json({ data: accepted });
    }
    async uploadPhotoOrReplace(photo, req, res) {
        const uploaded = await this.freeLanceService.uploadOrUpdatePhoto(photo, req.body.user.id);
        return res.status(201).json({ data: uploaded });
    }
    async rejectRequest(id, res) {
        const accepted = await this.freeLanceService.rejectUserRequest(parseInt(id));
        return res.status(200).json({ data: accepted });
    }
    async attachFileToPostPoint(userRequestId, file, fileType, res) {
        const isDone = await this.freeLanceService.attachFileToPostPoint(file, fileType, parseInt(userRequestId));
        return res.status(200).json({ message: "is done" });
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
    (0, common_1.Get)('getAllPostByCategory/:category'),
    __param(0, (0, common_1.Param)('category')),
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
    (0, common_1.Get)('paymentinyear/'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "paymentInMont", null);
__decorate([
    (0, common_1.Post)('searchaboutFreeLance'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Body)('Fname')),
    __param(2, (0, common_1.Body)('Lname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "serchAboutFreeLance", null);
__decorate([
    (0, common_1.Post)('attachfile/:serviceId'),
    __param(0, (0, common_1.Param)('serviceId')),
    __param(1, (0, common_1.Body)('file')),
    __param(2, (0, common_1.Body)('fileType')),
    __param(3, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "attachFile", null);
__decorate([
    (0, common_1.Get)('allCategory'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "getAllCategory", null);
__decorate([
    (0, common_1.Post)('searchAboutCategory'),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "searchAboutCategory", null);
__decorate([
    (0, common_1.Delete)('deleteIneterest/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "deleteIneterest", null);
__decorate([
    (0, common_1.Post)('addInterest/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "addIneterest", null);
__decorate([
    (0, common_1.Get)('showMyInterest'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "showMyInterest", null);
__decorate([
    (0, common_1.Get)('showPostAboutInterest'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "showPostAboutInterest", null);
__decorate([
    (0, common_1.Post)('addPost'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)('post')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, postWithPoint_model_1.postWithPoint]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "addPost", null);
__decorate([
    (0, common_1.Delete)('deletePost/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Get)('showUserRequest/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "showUserRequest", null);
__decorate([
    (0, common_1.Post)('acceptUserRequest/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "acceptUserRequest", null);
__decorate([
    (0, common_1.Post)('uploadPhotoOrReplace'),
    __param(0, (0, common_1.Body)('photo')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "uploadPhotoOrReplace", null);
__decorate([
    (0, common_1.Post)('rejectUserRequest/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "rejectRequest", null);
__decorate([
    (0, common_1.Post)('attachFileToPostPoint/:userRequestId'),
    __param(0, (0, common_1.Param)('userRequestId')),
    __param(1, (0, common_1.Body)('file')),
    __param(2, (0, common_1.Body)('fileType')),
    __param(3, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], FreeLanceController.prototype, "attachFileToPostPoint", null);
FreeLanceController = __decorate([
    (0, common_1.UseFilters)(global_exception_filter_1.HttpExceptionFilter),
    (0, common_1.Controller)('api/freeLace/'),
    __metadata("design:paramtypes", [freeLance_service_1.FreeLanceService])
], FreeLanceController);
exports.FreeLanceController = FreeLanceController;
//# sourceMappingURL=freeLance.controller.js.map