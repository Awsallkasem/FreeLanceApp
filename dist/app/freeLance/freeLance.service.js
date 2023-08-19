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
const post_model_1 = require("../../database/models/post.model");
const freeLance_model_1 = require("../../database/models/freeLance.model");
const service_model_1 = require("../../database/models/service.model");
const user_model_1 = require("../../database/models/user.model");
const sequelize_2 = require("sequelize");
const payment_model_1 = require("../../database/models/payment.model");
const path = require("path");
const fs = require("fs");
const stagging_model_1 = require("../../database/models/stagging.model");
const wallet_service_1 = require("../wallet/wallet.service");
const category_model_1 = require("../../database/models/category.model");
const interest_model_1 = require("../../database/models/interest.model");
const postWithPoint_model_1 = require("../../database/models/postWithPoint.model");
const userRequest_model_1 = require("../../database/models/userRequest.model");
const staggingToPoint_model_1 = require("../../database/models/staggingToPoint.model");
const payAndRecive_model_1 = require("../../database/models/payAndRecive.model");
let FreeLanceService = class FreeLanceService {
    constructor(UserModel, FreeLanceModel, ServiceModel, publishModel, PaymentModel, staggingModele, staggingToPointModele, categoryModele, ineterestModele, userRequestModel, postPointModel, payAndReciveModel, jwtService, walletService) {
        this.UserModel = UserModel;
        this.FreeLanceModel = FreeLanceModel;
        this.ServiceModel = ServiceModel;
        this.publishModel = publishModel;
        this.PaymentModel = PaymentModel;
        this.staggingModele = staggingModele;
        this.staggingToPointModele = staggingToPointModele;
        this.categoryModele = categoryModele;
        this.ineterestModele = ineterestModele;
        this.userRequestModel = userRequestModel;
        this.postPointModel = postPointModel;
        this.payAndReciveModel = payAndReciveModel;
        this.jwtService = jwtService;
        this.walletService = walletService;
    }
    async getAllPost() {
        const published = await this.publishModel.findAll({
            include: [{
                    model: user_model_1.User,
                    attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
                },]
        });
        if (!published) {
            throw new common_1.NotFoundException('post not fouund');
        }
        return published;
    }
    async getAllPostByCategory(category) {
        const regexCatCategory = new RegExp(category, 'i');
        const published = await this.publishModel.findAll({
            where: { category: { [sequelize_2.Op.like]: '%' + regexCatCategory.source + '%' } },
            include: [{
                    model: user_model_1.User,
                    attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
                },]
        });
        if (!published) {
            throw new common_1.NotFoundException('post not fouund');
        }
        return published;
    }
    async addService(service, UserId, postId) {
        const published = await this.publishModel.findByPk(postId);
        if (!published) {
            throw new common_1.NotFoundException('there no data');
        }
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
    async checkMyService(id) {
        const freeLance = await this.FreeLanceModel.findOne({ where: { userId: id } });
        const myService = await this.ServiceModel.findAll({
            where: { freelaneId: freeLance.id },
            include: [
                {
                    model: post_model_1.Posts,
                    include: [
                        {
                            model: user_model_1.User,
                            attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
                        },
                    ],
                },
            ],
        });
        if (!myService) {
            throw new common_1.NotFoundException('no service found');
        }
        return myService;
    }
    async showAcceptedServices(id) {
        const user = await this.UserModel.findOne({ where: { id: id }, include: [freeLance_model_1.FreeLance] });
        const freeLanceId = user.freeLances.id;
        const service = await this.ServiceModel.findAll({
            where: { freelaneId: freeLanceId, isAccepted: true },
            include: [
                {
                    model: post_model_1.Posts,
                    include: [
                        {
                            model: user_model_1.User,
                            attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
                        },
                    ],
                },
            ],
        });
        return service;
    }
    async showstatisticalsinyear(year, userId) {
        const freeLace = await this.FreeLanceModel.findOne({ where: { userId: userId } });
        if (!freeLace) {
            throw new common_1.NotFoundException('there no data');
        }
        const statisticals = await this.payAndReciveModel.statisticalsyear(year, freeLace.id);
        if (!statisticals) {
            throw new common_1.NotFoundException('there no data');
        }
        return statisticals;
    }
    async searchAboutFreeLance(Fname, Lname) {
        const regexFname = new RegExp(`${Fname}`, 'i');
        const regexLname = new RegExp(`${Lname}`, 'i');
        let user;
        if (Fname && Lname) {
            user = await this.UserModel.findAll({
                where: {
                    Fname: { [sequelize_2.Op.like]: '%' + regexFname.source + '%' },
                    Lname: { [sequelize_2.Op.like]: '%' + regexLname.source + '%' },
                    role: user_model_1.UserRole.FreeLnce,
                },
            });
        }
        else if (Fname) {
            user = await this.UserModel.findAll({
                where: {
                    Fname: { [sequelize_2.Op.like]: '%' + regexFname.source + '%' },
                    role: user_model_1.UserRole.FreeLnce,
                },
            });
        }
        else if (Lname) {
            user = await this.UserModel.findAll({
                where: {
                    Lname: { [sequelize_2.Op.like]: '%' + regexLname.source + '%' },
                    role: user_model_1.UserRole.FreeLnce,
                },
            });
        }
        else {
            throw new common_1.BadRequestException('There are required fields');
        }
        if (!user || user.length === 0) {
            throw new common_1.NotFoundException('No data found');
        }
        const searchPromises = user.map(async (element) => {
            const result = await this.FreeLanceModel.findOne({
                where: { userId: element.id },
                include: {
                    model: user_model_1.User,
                    attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
                },
            });
            return result;
        });
        const searchResults = await Promise.all(searchPromises);
        const filteredResults = searchResults.filter((result) => result !== null);
        if (filteredResults.length === 0) {
            throw new common_1.NotFoundException('No data found');
        }
        return filteredResults;
    }
    async uploadOrUpdatePhoto(photo, userId) {
        if (!photo) {
            throw new common_1.BadRequestException('photo is required');
        }
        const freeLance = await this.FreeLanceModel.findOne({
            where: { userId: userId }, include: [{
                    model: user_model_1.User,
                    attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
                },]
        });
        if (!freeLance) {
            throw new common_1.BadRequestException('there are no data');
        }
        const binaryData = Buffer.from(photo, 'base64');
        const filename = `file_${Date.now()}.${photo}`;
        const publicFolderPath = path.join(__dirname, '..', 'public');
        const filePath = path.join(publicFolderPath, filename);
        await fs.promises.mkdir(publicFolderPath, { recursive: true });
        await fs.promises.writeFile(filePath, binaryData);
        freeLance.photoName = filePath.replace(publicFolderPath, '').replace(/\\/g, '/');
        await freeLance.save();
        return freeLance;
    }
    async attachFile(file, fileType, serviceId) {
        const service = await this.ServiceModel.findByPk(serviceId);
        const post = await this.publishModel.findByPk(service.publishedId);
        if (!service || !post) {
            throw new common_1.NotFoundException('service not found');
        }
        const binaryData = Buffer.from(file, 'base64');
        const filename = `file_${Date.now()}.${fileType}`;
        const publicFolderPath = path.join(__dirname, '..', 'public');
        const filePath = path.join(publicFolderPath, filename);
        await fs.promises.mkdir(publicFolderPath, { recursive: true });
        await fs.promises.writeFile(filePath, binaryData);
        const stagging = await this.staggingModele.findOne({ where: { serviceId: serviceId } });
        if (!stagging || stagging.isAttached == true) {
            throw new common_1.NotFoundException('service not found');
        }
        const freelance = await this.FreeLanceModel.findByPk(service.freelaneId);
        stagging.isAttached = true;
        service.filePath = filePath.replace(publicFolderPath, '').replace(/\\/g, '/');
        const recive = await this.payAndReciveModel.create({
            userId: stagging.userId,
            freeLanceId: service.freelaneId,
            date: new Date(),
            category: post.category,
            amount: service.price,
            isByPoint: true
        });
        await service.save();
        await this.walletService.deposit(freelance.userId, service.price);
        await stagging.save();
        return true;
    }
    async showAllCategory() {
        const category = await this.categoryModele.findAll();
        if (!category) {
            throw new common_1.BadRequestException('there no data');
        }
        return category;
    }
    async addIneterest(categoryId, userId) {
        const freeLace = await this.FreeLanceModel.findOne({ where: { userId: userId } });
        if (!freeLace) {
            throw new common_1.BadRequestException('there no data');
        }
        const category = await this.categoryModele.findByPk(categoryId);
        if (!category) {
            throw new common_1.BadRequestException('there no data');
        }
        const interest = await this.ineterestModele.create({ freelaneId: freeLace.id, categor: category.categor });
        return interest;
    }
    async deleteIneterest(interestId, userId) {
        const interest = await this.ineterestModele.findByPk(interestId);
        if (!interest) {
            throw new common_1.BadRequestException('there no data');
        }
        const freeLace = await this.FreeLanceModel.findOne({ where: { userId: userId } });
        if (!freeLace) {
            throw new common_1.BadRequestException('there no data');
        }
        if (interest.freelaneId != freeLace.id) {
            throw new common_1.UnauthorizedException('access denided');
        }
        await interest.destroy();
        return true;
    }
    async searchAboutCategory(catName) {
        const regexCatCategory = new RegExp(catName, 'i');
        const category = await this.categoryModele.findAll({ where: { categor: { [sequelize_2.Op.like]: '%' + regexCatCategory.source + '%' } } });
        if (!category) {
            throw new common_1.NotFoundException('there no data');
        }
        return category;
    }
    async showMyInterest(userId) {
        const freeLace = await this.FreeLanceModel.findOne({ where: { userId: userId } });
        const interest = await this.ineterestModele.findAll({ where: { freelaneId: freeLace.id } });
        return interest;
    }
    async showPostAboutInterest(userId) {
        const myInterest = await this.showMyInterest(userId);
        if (!myInterest) {
            throw new common_1.NotFoundException('there no data');
        }
        const interests = myInterest.map(interest => interest.categor);
        const items = await this.publishModel.findAll({
            where: {
                category: interests,
            },
        });
        return items;
    }
    async addPost(post, userId) {
        const freeLace = await this.FreeLanceModel.findOne({ where: { userId: userId } });
        post.freelaneId = freeLace.id;
        const validationErrors = await (0, class_validator_1.validate)(new postWithPoint_model_1.postWithPoint(post));
        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((error) => Object.values(error.constraints));
            throw new common_1.BadRequestException(errorMessages);
        }
        const newPost = await this.postPointModel.create(post);
        return newPost;
    }
    async deletePost(id) {
        const del = await this.postPointModel.findByPk(id);
        if (!del) {
            throw new common_1.NotFoundException('there no data');
        }
        await del.destroy();
        return true;
    }
    async showUserRequest(id) {
        const userRequest = await this.userRequestModel.findAll({ where: { postId: id, isRejected: false } });
        if (!userRequest.length) {
            throw new common_1.NotFoundException('there no data');
        }
        return userRequest;
    }
    async acceptUserRequest(id) {
        const userRequest = await this.userRequestModel.findByPk(id);
        if (!userRequest) {
            throw new common_1.NotFoundException('there no data');
        }
        const user = await this.UserModel.findByPk(userRequest.userId);
        const post = await this.postPointModel.findByPk(userRequest.postId);
        if (!user || !post) {
            throw new common_1.NotFoundException('there no data');
        }
        if (user.point < post.price) {
            throw new common_1.BadRequestException('the user havent enough point');
        }
        userRequest.isAcceppted = true;
        user.point = user.point - post.price;
        await user.save;
        await userRequest.save();
        const stagging = await this.staggingToPointModele.create({
            userRequestId: id,
            postId: post.id
        });
        return true;
    }
    async rejectUserRequest(id) {
        const userRequest = await this.userRequestModel.findByPk(id);
        if (userRequest.isAcceppted == true) {
            throw new common_1.BadRequestException('this user request is accepted');
        }
        if (!userRequest) {
            throw new common_1.NotFoundException('there no data');
        }
        userRequest.isRejected = true;
        await userRequest.save();
        return true;
    }
    async attachFileToPostPoint(file, fileType, userRequestId) {
        const userRequest = await this.userRequestModel.findByPk(userRequestId);
        if (!userRequest) {
            throw new common_1.NotFoundException('userRequest not found');
        }
        const binaryData = Buffer.from(file, 'base64');
        const filename = `file_${Date.now()}.${fileType}`;
        const publicFolderPath = path.join(__dirname, '..', 'public');
        const filePath = path.join(publicFolderPath, filename);
        await fs.promises.mkdir(publicFolderPath, { recursive: true });
        await fs.promises.writeFile(filePath, binaryData);
        const stagging = await this.staggingToPointModele.findOne({ where: { userRequestId: userRequestId } });
        if (!stagging || stagging.isAttached == true) {
            throw new common_1.NotFoundException('stagging not found');
        }
        const post = await this.postPointModel.findByPk(userRequest.postId);
        if (!post) {
            throw new common_1.NotFoundException('there no data');
        }
        const freelance = await this.FreeLanceModel.findByPk(post.freelaneId);
        stagging.isAttached = true;
        userRequest.filePath = filePath.replace(publicFolderPath, '').replace(/\\/g, '/');
        const recive = await this.payAndReciveModel.create({
            userId: userRequest.userId,
            freeLanceId: post.freelaneId,
            date: new Date(),
            category: post.category,
            amount: post.price
        });
        await userRequest.save();
        await this.walletService.depositByPoint(freelance.userId, post.price);
        await stagging.save();
        return true;
    }
};
FreeLanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(freeLance_model_1.FreeLance)),
    __param(2, (0, sequelize_1.InjectModel)(service_model_1.Service)),
    __param(3, (0, sequelize_1.InjectModel)(post_model_1.Posts)),
    __param(4, (0, sequelize_1.InjectModel)(payment_model_1.Payment)),
    __param(5, (0, sequelize_1.InjectModel)(stagging_model_1.Stagging)),
    __param(6, (0, sequelize_1.InjectModel)(staggingToPoint_model_1.StaggingToPoint)),
    __param(7, (0, sequelize_1.InjectModel)(category_model_1.Category)),
    __param(8, (0, sequelize_1.InjectModel)(interest_model_1.Ineterest)),
    __param(9, (0, sequelize_1.InjectModel)(userRequest_model_1.UserRequest)),
    __param(10, (0, sequelize_1.InjectModel)(postWithPoint_model_1.postWithPoint)),
    __param(11, (0, sequelize_1.InjectModel)(payAndRecive_model_1.PayAndRecive)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, jwt_1.JwtService,
        wallet_service_1.WalletService])
], FreeLanceService);
exports.FreeLanceService = FreeLanceService;
//# sourceMappingURL=freeLance.service.js.map