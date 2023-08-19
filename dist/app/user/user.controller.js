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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const post_model_1 = require("../../database/models/post.model");
const global_exception_filter_1 = require("../../filters/global-exception.filter");
let UserController = class UserController {
    constructor(userservice) {
        this.userservice = userservice;
    }
    async newPost(post, req, res) {
        const createPublication = new post_model_1.Posts(post);
        const newPublication = await this.userservice.createPost(createPublication.dataValues, req.body.user);
        return res.status(201).json({ message: 'New post uploaded', post: newPublication });
    }
    async getMyPost(req, res) {
        const myPost = await this.userservice.getMyPost(req.body.user.id);
        return res.status(200).json({ myPost: myPost });
    }
    async servicesOnPost(id, res) {
        const service = await this.userservice.servicesOnPost(parseInt(id));
        return res.status(200).json({ service: service });
    }
    async freeLanceInfo(id, res) {
        const freeLanceInfo = await this.userservice.showFreeLanceinfo(parseInt(id));
        return res.status(200).json({ freeLanceInfo: freeLanceInfo });
    }
    async rateFreeLance(id, rate, req, res) {
        const userId = req.body.user.id;
        const rateFreeLance = await this.userservice.rateFreeLance(parseInt(id), userId, rate);
        return res.status(200).json({ rate: rateFreeLance });
    }
    async acceptRequest(id, res, req) {
        const service = await this.userservice.acceptRequest(parseInt(id), req.body.user.id);
        return res.status(200).json({ service: service });
    }
    async serchAboutFreeLance(res, Fname, Lname) {
        const freeLace = await this.userservice.searchAboutFreeLance(Fname, Lname);
        return res.status(200).json({ date: freeLace });
    }
    async getAllCategory(res) {
        const data = await this.userservice.showAllCategory();
        return res.status(200).json({ data: data });
    }
    async searchAboutCategory(name, res) {
        const data = await this.userservice.searchAboutCategory(name);
        return res.status(200).json({ data: data });
    }
    async adddRequestOnPostPoint(id, req, res) {
        const newRequest = await this.userservice.adddRequestOnPostPoint(parseInt(id), req.body.user.id);
        return res.status(201).json({ data: newRequest });
    }
    async deletePost(id, res) {
        const del = await this.userservice.deletRequest(parseInt(id));
        return res.status(200).json({ data: "done" });
    }
    async showMyRequests(req, res) {
        const showMine = await this.userservice.showMyRequests(req.body.user.id);
        return res.status(200).json({ data: showMine });
    }
    async showPostpoint(res) {
        const posts = await this.userservice.showPostpoint();
        return res.status(200).json({ data: posts });
    }
    async showPostpointByCategory(res, category) {
        const posts = await this.userservice.showPostPointByCategory(category);
        return res.status(200).json({ data: posts });
    }
    async addComplaint(req, res, serviceId, content) {
        const addComplaint = await this.userservice.addComplaint(parseInt(serviceId), req.body.user.id, content);
        return res.status(201).json({ data: addComplaint });
    }
};
__decorate([
    (0, common_1.Post)('newPost'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_model_1.Posts, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "newPost", null);
__decorate([
    (0, common_1.Get)('myPosts'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMyPost", null);
__decorate([
    (0, common_1.Get)('servicesOnPost/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "servicesOnPost", null);
__decorate([
    (0, common_1.Get)('getFreeLanceInfo/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "freeLanceInfo", null);
__decorate([
    (0, common_1.Post)('rateFreeLance/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('rate')),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "rateFreeLance", null);
__decorate([
    (0, common_1.Post)('acceptRequest/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "acceptRequest", null);
__decorate([
    (0, common_1.Post)('searchaboutFreeLance'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Body)('Fname')),
    __param(2, (0, common_1.Body)('Lname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "serchAboutFreeLance", null);
__decorate([
    (0, common_1.Get)('allCategory'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllCategory", null);
__decorate([
    (0, common_1.Post)('searchAboutCategory'),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchAboutCategory", null);
__decorate([
    (0, common_1.Post)('adddRequestOnPostPoint/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "adddRequestOnPostPoint", null);
__decorate([
    (0, common_1.Delete)('deleteRequest/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Get)('showMyRequests'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "showMyRequests", null);
__decorate([
    (0, common_1.Get)('showPostpoint'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "showPostpoint", null);
__decorate([
    (0, common_1.Get)('showPostpointByCategory/:category'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "showPostpointByCategory", null);
__decorate([
    (0, common_1.Post)('addComplaint/:serviceId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Param)('serviceId')),
    __param(3, (0, common_1.Body)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addComplaint", null);
UserController = __decorate([
    (0, common_1.UseFilters)(global_exception_filter_1.HttpExceptionFilter),
    (0, common_1.Controller)('api/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map