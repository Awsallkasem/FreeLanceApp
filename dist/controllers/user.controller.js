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
const user_service_1 = require("../services/user.service");
const Publish_model_1 = require("../database/models/Publish.model");
let UserController = class UserController {
    constructor(userservice) {
        this.userservice = userservice;
    }
    async newPost(post, req, res) {
        try {
            const createPublication = new Publish_model_1.Published(post);
            const newPublication = await this.userservice.createPost(createPublication.dataValues, req.body.user);
            return res.status(201).json({ message: 'New post uploaded', post: newPublication });
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async getMyPost(req) {
        return await this.userservice.getMyPost(req.body.user.id);
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMyPost", null);
UserController = __decorate([
    (0, common_1.Controller)('api/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map