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
const post_model_1 = require("../../database/models/post.model");
const class_validator_1 = require("class-validator");
const jwt_1 = require("@nestjs/jwt");
const service_model_1 = require("../../database/models/service.model");
const freeLance_model_1 = require("../../database/models/freeLance.model");
const rating_model_1 = require("../../database/models/rating.model");
const wallet_service_1 = require("../wallet/wallet.service");
const stagging_model_1 = require("../../database/models/stagging.model");
const category_model_1 = require("../../database/models/category.model");
const sequelize_2 = require("sequelize");
const userRequest_model_1 = require("../../database/models/userRequest.model");
const postWithPoint_model_1 = require("../../database/models/postWithPoint.model");
const complaint_model_1 = require("../../database/models/complaint.model");
let UserService = class UserService {
    constructor(userModel, freeLanceModel, staggingModele, ratingModele, postModel, serviceModele, categoryModele, userRequestModele, postWithPointModele, walletService, complaintModele, jwtService) {
        this.userModel = userModel;
        this.freeLanceModel = freeLanceModel;
        this.staggingModele = staggingModele;
        this.ratingModele = ratingModele;
        this.postModel = postModel;
        this.serviceModele = serviceModele;
        this.categoryModele = categoryModele;
        this.userRequestModele = userRequestModele;
        this.postWithPointModele = postWithPointModele;
        this.walletService = walletService;
        this.complaintModele = complaintModele;
        this.jwtService = jwtService;
    }
    async createPost(published, user) {
        published.userId = user.id;
        const validationErrors = await (0, class_validator_1.validate)(new post_model_1.Posts(published));
        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((error) => Object.values(error.constraints));
            throw new common_1.BadRequestException(errorMessages);
        }
        return await this.postModel.create(published);
    }
    async getMyPost(id) {
        return await this.postModel.findAll({
            where: { userId: id }, include: [
                {
                    model: user_model_1.User,
                    attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
                }
            ]
        });
    }
    async servicesOnPost(id) {
        const published = await this.postModel.findByPk(id);
        if (!published) {
            throw new common_1.NotFoundException('post not fouund');
        }
        const service = await this.serviceModele.findAll({
            where: {
                publishedId: id
            },
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
        if (!service) {
            throw new common_1.NotFoundException('service not found');
        }
        return service;
    }
    async showFreeLanceinfo(id) {
        const freeLance = await this.freeLanceModel.findOne({
            where: { id: id }, include: [{
                    model: user_model_1.User,
                    attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
                }]
        });
        if (!freeLance) {
            throw new common_1.NotFoundException('free lance not found');
        }
        return { freeLance: freeLance };
    }
    async rateFreeLance(freeLanceId, userId, rate) {
        const isExist = await this.ratingModele.findOne({ where: { userId: userId, freelaneId: freeLanceId } });
        if (isExist) {
            throw new common_1.BadRequestException('the user already rated this one');
        }
        const rating = new rating_model_1.Rating({
            userId: userId,
            freelaneId: freeLanceId,
            rating: rate,
        });
        const validationErrors = await (0, class_validator_1.validate)(rating);
        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((error) => Object.values(error.constraints));
            throw new common_1.BadRequestException(errorMessages);
        }
        await this.ratingModele.create(rating.dataValues);
        const freeLance = await this.freeLanceModel.findByPk(freeLanceId);
        freeLance.rate = await freeLance.calculateRating();
        await freeLance.save();
        return await freeLance.calculateRating();
    }
    async acceptRequest(serviceId, userId) {
        const service = await this.serviceModele.findByPk(serviceId);
        if (!service) {
            throw new common_1.NotFoundException('service not found');
        }
        service.Sdate = new Date();
        const sdate = new Date(service.Sdate + 'T00:00:00');
        const endDate = new Date(sdate.getTime() + service.numDays * 24 * 60 * 60 * 1000);
        service.Edate = endDate;
        service.isAccepted = true;
        const stagging = await this.staggingModele.create({ serviceId: serviceId, userId: userId });
        await this.walletService.disposit(userId, service.price);
        await service.save();
        return service;
    }
    async searchAboutFreeLance(Fname, Lname) {
        const regexFname = new RegExp(`${Fname}`, 'i');
        const regexLname = new RegExp(`${Lname}`, 'i');
        let user;
        if (Fname && Lname) {
            user = await this.userModel.findAll({
                where: {
                    Fname: { [sequelize_2.Op.like]: '%' + regexFname.source + '%' },
                    Lname: { [sequelize_2.Op.like]: '%' + regexLname.source + '%' },
                    role: user_model_1.UserRole.FreeLnce,
                },
            });
        }
        else if (Fname) {
            user = await this.userModel.findAll({
                where: {
                    Fname: { [sequelize_2.Op.like]: '%' + regexFname.source + '%' },
                    role: user_model_1.UserRole.FreeLnce,
                },
            });
        }
        else if (Lname) {
            user = await this.userModel.findAll({
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
            const result = await this.freeLanceModel.findOne({
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
    async showAllCategory() {
        const category = await this.categoryModele.findAll();
        if (!category) {
            throw new common_1.BadRequestException('there no data');
        }
        return category;
    }
    async searchAboutCategory(catName) {
        const regexCatName = new RegExp(`${catName}`, 'i');
        const category = await this.categoryModele.findAll({ where: { categor: { [sequelize_2.Op.like]: '%' + regexCatName.source + '%' } } });
        if (!category) {
            throw new common_1.NotFoundException('there no data');
        }
        return category;
    }
    async adddRequestOnPostPoint(postId, userId) {
        const isExist = await this.userRequestModele.findOne({ where: { userId: userId, isRejected: false, postId: postId } });
        if (isExist) {
            throw new common_1.BadRequestException('there ara a pervious request');
        }
        const user = await this.userModel.findByPk(userId);
        const post = await this.postWithPointModele.findByPk(postId);
        if (!user || !post) {
            throw new common_1.NotFoundException('there no data');
        }
        if (user.point < post.price) {
            throw new common_1.BadRequestException('you should have more point');
        }
        const addRequest = await this.userRequestModele.create({
            postId: postId,
            userId: userId
        });
        return addRequest;
    }
    async deletRequest(id) {
        const del = await this.userRequestModele.findByPk(id);
        if (!del) {
            throw new common_1.NotFoundException('there no data');
        }
        await del.destroy();
        return true;
    }
    async showMyRequests(userId) {
        const myRequest = await this.userRequestModele.findAll({
            where: { userId: userId }, include: [
                {
                    model: postWithPoint_model_1.postWithPoint,
                    attributes: { include: ['numDays', 'price', 'content'] },
                }
            ]
        });
        if (!myRequest) {
            throw new common_1.NotFoundException('there no data');
        }
        return myRequest;
    }
    async showAcceptedRequests(userId) {
        const myRequest = await this.userRequestModele.findAll({
            where: { userId: userId, isAcceppted: true }, include: [
                {
                    model: postWithPoint_model_1.postWithPoint,
                    attributes: { include: ['numDays', 'price', 'content'] },
                }
            ]
        });
        if (!myRequest) {
            throw new common_1.NotFoundException('there no data');
        }
        return myRequest;
    }
    async showRejectRequest(userId) {
        const myRequest = await this.userRequestModele.findAll({
            where: { userId: userId, isRejected: true }, include: [
                {
                    model: postWithPoint_model_1.postWithPoint,
                    attributes: { include: ['numDays', 'price', 'content'] },
                }
            ]
        });
        if (!myRequest) {
            throw new common_1.NotFoundException('there no data');
        }
        return myRequest;
    }
    async showPostpoint() {
        const published = await this.postWithPointModele.findAll({
            include: [{
                    model: freeLance_model_1.FreeLance,
                    include: [{
                            model: user_model_1.User,
                            attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
                        }]
                },]
        });
        if (!published) {
            throw new common_1.NotFoundException('there no data');
        }
        return published;
    }
    async showPostPointByCategory(category) {
        const regexCatCategory = new RegExp(category, 'i');
        const published = await this.postWithPointModele.findAll({
            where: { category: { [sequelize_2.Op.like]: '%' + regexCatCategory.source + '%' } },
            include: [{
                    model: freeLance_model_1.FreeLance,
                    include: [{
                            model: user_model_1.User,
                            attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'isBlocked', 'isReject', 'isActive'] },
                        }]
                },]
        });
        if (!published) {
            throw new common_1.NotFoundException('post not fouund');
        }
        return published;
    }
    async addComplaint(serviceId, userId, content) {
        const service = await this.serviceModele.findByPk(serviceId);
        if (!service) {
            throw new common_1.NotFoundException('there no data');
        }
        const newComplaint = await this.complaintModele.create({
            userId: userId,
            serviceId: serviceId,
        });
        if (content) {
            newComplaint.content = content;
        }
        return await newComplaint.save();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(freeLance_model_1.FreeLance)),
    __param(2, (0, sequelize_1.InjectModel)(stagging_model_1.Stagging)),
    __param(3, (0, sequelize_1.InjectModel)(rating_model_1.Rating)),
    __param(4, (0, sequelize_1.InjectModel)(post_model_1.Posts)),
    __param(5, (0, sequelize_1.InjectModel)(service_model_1.Service)),
    __param(6, (0, sequelize_1.InjectModel)(category_model_1.Category)),
    __param(7, (0, sequelize_1.InjectModel)(userRequest_model_1.UserRequest)),
    __param(8, (0, sequelize_1.InjectModel)(postWithPoint_model_1.postWithPoint)),
    __param(10, (0, sequelize_1.InjectModel)(complaint_model_1.Complaint)),
    __param(11, (0, sequelize_1.InjectModel)(rating_model_1.Rating)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, wallet_service_1.WalletService, Object, jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map