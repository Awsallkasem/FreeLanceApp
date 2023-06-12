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
const Publish_model_1 = require("../../database/models/Publish.model");
const global_exception_filter_1 = require("../../filters/global-exception.filter");
let UserController = class UserController {
    constructor(userservice) {
        this.userservice = userservice;
    }
    async newPost(post, req, res) {
        const createPublication = new Publish_model_1.Published(post);
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
    async acceptRequest(id, res) {
        const service = await this.userservice.acceptRequest(parseInt(id));
        return res.status(200).json({ service: service });
    }
};
__decorate([
    (0, common_1.Post)('newPost'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Publish_model_1.Published, Object, Object]),
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "acceptRequest", null);
UserController = __decorate([
    (0, common_1.UseFilters)(global_exception_filter_1.HttpExceptionFilter),
    (0, common_1.Controller)('api/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map