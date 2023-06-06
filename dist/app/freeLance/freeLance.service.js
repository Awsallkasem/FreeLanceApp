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
exports.FreeLanceService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("@nestjs/sequelize");
const class_validator_1 = require("class-validator");
const freeLance_model_1 = require("../../database/models/freeLance.model");
const service_model_1 = require("../../database/models/service.model");
const user_model_1 = require("../../database/models/user.model");
let FreeLanceService = class FreeLanceService {
    constructor(UserModel, FreeLanceModel, ServiceModel, jwtService) {
        this.UserModel = UserModel;
        this.FreeLanceModel = FreeLanceModel;
        this.ServiceModel = ServiceModel;
        this.jwtService = jwtService;
    }
    async addService(service, UserId, postId) {
        const user = await this.UserModel.findOne({ where: { id: UserId }, include: [freeLance_model_1.FreeLance] });
        const freeLanceId = user.freeLances.id;
        service.freelaneId = freeLanceId;
        service.publishedId = postId;
        const validationErrors = await (0, class_validator_1.validate)(service);
        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((error) => Object.values(error.constraints));
            throw new common_1.BadRequestException(errorMessages);
        }
        const createService = await this.ServiceModel.create(service);
        return createService;
    }
};
FreeLanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(freeLance_model_1.FreeLance)),
    __param(2, (0, sequelize_1.InjectModel)(service_model_1.Service)),
    __metadata("design:paramtypes", [Object, Object, Object, jwt_1.JwtService])
], FreeLanceService);
exports.FreeLanceService = FreeLanceService;
//# sourceMappingURL=freeLance.service.js.map