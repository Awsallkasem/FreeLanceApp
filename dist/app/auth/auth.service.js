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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("../../database/models/user.model");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const class_validator_1 = require("class-validator");
const freeLance_model_1 = require("../../database/models/freeLance.model");
let AuthService = class AuthService {
    constructor(userModel, FreeLacneModele, jwtService) {
        this.userModel = userModel;
        this.FreeLacneModele = FreeLacneModele;
        this.jwtService = jwtService;
    }
    async register(user, freeLance) {
        const validationErrors = await (0, class_validator_1.validate)(new user_model_1.User(user));
        const isExist = await this.findByEmail(user.email);
        if (isExist) {
            throw new common_1.BadRequestException('email already used');
        }
        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((error) => Object.values(error.constraints));
            throw new common_1.BadRequestException(errorMessages);
        }
        const saltRounds = 10;
        user.password = await (0, bcrypt_1.hash)(user.password, saltRounds);
        let newUsers = null;
        try {
            const newUser = await this.userModel.sequelize.transaction(async (t) => {
                const transactionHost = { transaction: t };
                newUsers = await this.userModel.create(user, transactionHost);
                if (user.role == user_model_1.UserRole.FreeLnce) {
                    console.log(newUsers.id);
                    freeLance.userId = newUsers.id;
                    console.log(freeLance.userId);
                    if (freeLance) {
                        const validationErrors = await (0, class_validator_1.validate)(new freeLance_model_1.FreeLance(freeLance));
                        if (validationErrors.length > 0) {
                            const errorMessages = validationErrors.map((error) => Object.values(error.constraints));
                            throw new common_1.BadRequestException(errorMessages);
                        }
                        await this.FreeLacneModele.create(freeLance, transactionHost);
                    }
                }
            });
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
        const token = await this.login(user);
        return { user: newUsers, token };
    }
    async validatePassword(email, password) {
        const user = await this.findByEmail(email);
        if (user && await (0, bcrypt_1.compare)(password, user.password)) {
            return user;
        }
        return null;
    }
    async findByEmail(email) {
        const user = await this.userModel.findOne({
            where: { email: email },
        });
        if (user) {
            return user.dataValues;
        }
        else
            return null;
    }
    async login(user) {
        const payload = { email: user.email };
        return this.jwtService.sign(payload);
    }
    decodeToken(token) {
        try {
            const decodedToken = this.jwtService.decode(token);
            return decodedToken;
        }
        catch (err) {
            return err;
        }
    }
    async findById(id) {
        return await this.userModel.findOne({ where: { id: id } });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(freeLance_model_1.FreeLance)),
    __metadata("design:paramtypes", [Object, Object, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map