"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = exports.UserProviders = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("../../database/models/user.model");
const auth_module_1 = require("../auth/auth.module");
const admin_module_1 = require("../admin/admin.module");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const decodeToken_middleware_1 = require("../../middlewares/authrization/decodeToken.middleware");
const user_middleware_1 = require("../../middlewares/authrization/user.middleware");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth.service");
const database_module_1 = require("../../database/database.module");
const freeLance_module_1 = require("../freeLance/freeLance.module");
const wallet_module_1 = require("../wallet/wallet.module");
const wallet_service_1 = require("../wallet/wallet.service");
const oneSignal_service_1 = require("../oneSignal.service");
exports.UserProviders = [
    {
        provide: 'USERS_REPOSITORY',
        useValue: user_model_1.User,
    },
];
let UserModule = class UserModule {
    configure(consumer) {
        consumer.apply(decodeToken_middleware_1.decodeTokenMiddleware)
            .forRoutes('api/user')
            .apply(user_middleware_1.UserMiddleware)
            .forRoutes('api/user/*');
    }
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            jwt_1.JwtModule.register({
                secret: 'your-secret-key',
                signOptions: { expiresIn: '1h' },
            }),
            auth_module_1.AuthModule,
            admin_module_1.AdminModule,
            freeLance_module_1.FreeLacneModule,
            wallet_module_1.WalletModule
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, auth_service_1.AuthService, wallet_service_1.WalletService, ...exports.UserProviders, oneSignal_service_1.OneSignalService]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map