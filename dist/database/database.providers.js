"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
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
exports.databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new sequelize_typescript_1.Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'free',
                password: 'free',
                database: 'free',
                logging: false
            });
            sequelize.addModels([user_model_1.User, post_model_1.Posts, rating_model_1.Rating, packgs_model_1.Packgs, service_model_1.Service, payAndRecive_model_1.PayAndRecive, postWithPoint_model_1.postWithPoint, complaint_model_1.Complaint, category_model_1.Category, userRequest_model_1.UserRequest, staggingToPoint_model_1.StaggingToPoint, freeLance_model_1.FreeLance, interest_model_1.Ineterest, payment_model_1.Payment, payout_model_1.Payout, stagging_model_1.Stagging]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
//# sourceMappingURL=database.providers.js.map