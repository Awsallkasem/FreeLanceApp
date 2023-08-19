"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeLacneModule = void 0;
const common_1 = require("@nestjs/common");
const decodeToken_middleware_1 = require("../../middlewares/authrization/decodeToken.middleware");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth.service");
const database_module_1 = require("../../database/database.module");
const freeLance_controller_1 = require("./freeLance.controller");
const freeLance_service_1 = require("./freeLance.service");
const freelance_middleware_1 = require("../../middlewares/authrization/freelance.middleware");
const wallet_module_1 = require("../wallet/wallet.module");
const wallet_service_1 = require("../wallet/wallet.service");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const oneSignal_service_1 = require("../oneSignal.service");
let FreeLacneModule = class FreeLacneModule {
    configure(consumer) {
        consumer.apply(decodeToken_middleware_1.decodeTokenMiddleware)
            .forRoutes('api/freeLace')
            .apply(freelance_middleware_1.FreeLanceMiddleware)
            .forRoutes('api/freeLace/*');
    }
};
FreeLacneModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            jwt_1.JwtModule.register({
                secret: 'yasdmfy',
                signOptions: { expiresIn: '1h' },
            }),
            wallet_module_1.WalletModule
        ],
        controllers: [freeLance_controller_1.FreeLanceController],
        providers: [auth_service_1.AuthService, wallet_service_1.WalletService, freeLance_service_1.FreeLanceService, decodeToken_middleware_1.decodeTokenMiddleware, freelance_middleware_1.FreeLanceMiddleware, oneSignal_service_1.OneSignalService],
    })
], FreeLacneModule);
exports.FreeLacneModule = FreeLacneModule;
//# sourceMappingURL=freeLance.module.js.map