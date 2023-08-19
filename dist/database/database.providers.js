"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./models/user.model");
const Publish_model_1 = require("./models/Publish.model");
const rating_model_1 = require("./models/rating.model");
const freeLance_model_1 = require("./models/freeLance.model");
const service_model_1 = require("./models/service.model");
const payment_model_1 = require("./models/payment.model");
const licnse_model_1 = require("./models/licnse.model");
const payout_model_1 = require("./models/payout.model");
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
            sequelize.addModels([user_model_1.User, Publish_model_1.Published, rating_model_1.Rating, service_model_1.Service, freeLance_model_1.FreeLance, payment_model_1.Payment, licnse_model_1.Licens, payout_model_1.Payout]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
//# sourceMappingURL=database.providers.js.map