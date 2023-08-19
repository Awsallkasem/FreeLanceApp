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
const Publish_model_1 = require("./models/Publish.model");
const rating_model_1 = require("./models/rating.model");
const freeLance_model_1 = require("./models/freeLance.model");
const service_model_1 = require("./models/service.model");
const payment_model_1 = require("./models/payment.model");
const licnse_model_1 = require("./models/licnse.model");
const payout_model_1 = require("./models/payout.model");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([user_model_1.User, Publish_model_1.Published, rating_model_1.Rating, service_model_1.Service, freeLance_model_1.FreeLance, payment_model_1.Payment, licnse_model_1.Licens, payout_model_1.Payout])],
        providers: [...database_providers_1.databaseProviders],
        exports: [...database_providers_1.databaseProviders, sequelize_1.SequelizeModule],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map