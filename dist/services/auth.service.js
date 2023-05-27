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
const user_model_1 = require("../database/models/user.model");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("typeorm");
const bcrypt_1 = require("bcrypt");
const class_validator_1 = require("class-validator");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async register(user) {
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
        const newUser = await this.userRepository.create(user);
        const token = await this.login(user);
        return { user: newUser, token };
    }
    async validatePassword(email, password) {
        const user = await this.findByEmail(email);
        if (user && await (0, bcrypt_1.compare)(password, user.password)) {
            return user;
        }
        return null;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({
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
        console.log(id);
        return await this.userRepository.findOne({ where: { id: id } });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_model_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map