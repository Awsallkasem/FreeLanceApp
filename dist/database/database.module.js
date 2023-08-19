"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const database_providers_1 = require("./database.providers");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./models/user.model");
const post_model_1 = require("./models/post.model");
const rating_model_1 = require("./models/rating.model");
const freeLance_model_1 = require("./models/freeLance.model");
const service_model_1 = require("./models/service.model");
const payment_model_1 = require("./models/payment.model");
const payout_model_1 = require("./models/payout.model");
const stagging_model_1 = require("./models/stagging.model");
const category_model_1 = require("./models/category.model");
const interest_model_1 = require("./models/interest.model");
const postWithPoint_model_1 = require("./models/postWithPoint.model");
const userRequest_model_1 = require("./models/userRequest.model");
const staggingToPoint_model_1 = require("./models/staggingToPoint.model");
const payAndRecive_model_1 = require("./models/payAndRecive.model");
const complaint_model_1 = require("./models/complaint.model");
const packgs_model_1 = require("./models/packgs.model");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([user_model_1.User, post_model_1.Posts, rating_model_1.Rating, packgs_model_1.Packgs, service_model_1.Service, postWithPoint_model_1.postWithPoint, complaint_model_1.Complaint, payAndRecive_model_1.PayAndRecive, userRequest_model_1.UserRequest, staggingToPoint_model_1.StaggingToPoint, freeLance_model_1.FreeLance, payment_model_1.Payment, payout_model_1.Payout, interest_model_1.Ineterest, category_model_1.Category, stagging_model_1.Stagging])],
        providers: [...database_providers_1.databaseProviders],
        exports: [...database_providers_1.databaseProviders, sequelize_1.SequelizeModule],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map