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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const user_model_1 = require("../../database/models/user.model");
const freeLance_model_1 = require("../../database/models/freeLance.model");
const global_exception_filter_1 = require("../../filters/global-exception.filter");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(user, freeLance, res) {
        const createUser = new user_model_1.User(user);
        const createFreeLance = new freeLance_model_1.FreeLance(freeLance);
        const newUser = await this.authService.register(createUser.dataValues, createFreeLance.dataValues);
        res.setHeader('Authorization', newUser.token);
        return res.status(201).json({ message: 'User registered successfully', user: newUser.user });
    }
    async login(user, res) {
        if (!user.password || !user.email) {
            throw new common_1.BadRequestException('all filed is required');
        }
        const authenticatedUser = await this.authService.validatePassword(user.email, user.password);
        if (!authenticatedUser) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = await this.authService.login(authenticatedUser);
        res.setHeader('Authorization', token);
        return res.status(200).json({ message: 'user registered' });
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)('user')),
    __param(1, (0, common_1.Body)('freeLance')),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, freeLance_model_1.FreeLance, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, common_1.UseFilters)(global_exception_filter_1.HttpExceptionFilter),
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map