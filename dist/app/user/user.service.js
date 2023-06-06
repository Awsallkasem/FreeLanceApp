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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("../../database/models/user.model");
const Publish_model_1 = require("../../database/models/Publish.model");
const class_validator_1 = require("class-validator");
const jwt_1 = require("@nestjs/jwt");
const service_model_1 = require("../../database/models/service.model");
let UserService = class UserService {
    constructor(userModel, publishModel, serviceModele, jwtService) {
        this.userModel = userModel;
        this.publishModel = publishModel;
        this.serviceModele = serviceModele;
        this.jwtService = jwtService;
    }
    async createPost(published, user) {
        published.userId = user.id;
        const validationErrors = await (0, class_validator_1.validate)(new Publish_model_1.Published(published));
        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((error) => Object.values(error.constraints));
            throw new common_1.BadRequestException(errorMessages);
        }
        return await this.publishModel.create(published);
    }
    async getMyPost(id) {
        return await this.publishModel.findAll({ where: { userId: id }, include: [user_model_1.User] });
    }
    async servicesOnPost(id) {
        const service = await this.serviceModele.findAll({ where: {
                publishedId: id
            } });
        if (!service) {
            throw new common_1.NotFoundException;
        }
        return service;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(Publish_model_1.Published)),
    __param(2, (0, sequelize_1.InjectModel)(service_model_1.Service)),
    __metadata("design:paramtypes", [Object, Object, Object, jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map