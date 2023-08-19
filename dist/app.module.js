"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const database_module_1 = require("./database/database.module");
const user_module_1 = require("./app/user/user.module");
const admin_module_1 = require("./app/admin/admin.module");
const freeLance_module_1 = require("./app/freeLance/freeLance.module");
const payaments_module_1 = require("./app/payments/payaments.module");
const sequelize_config_1 = require("./config/sequelize.config");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const category_seed_1 = require("./database/seeds/categoryseed/category.seed");
const oneSignal_service_1 = require("./app/oneSignal.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRoot(sequelize_config_1.sequelizeConfig),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            database_module_1.DatabaseModule,
            user_module_1.UserModule,
            freeLance_module_1.FreeLacneModule,
            admin_module_1.AdminModule,
            payaments_module_1.PayPalModule,
        ],
        providers: [category_seed_1.CategorySeed, oneSignal_service_1.OneSignalService],
        controllers: []
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map