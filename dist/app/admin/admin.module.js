"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./admin.service");
const decodeToken_middleware_1 = require("../../middlewares/authrization/decodeToken.middleware");
const admin_middleware_1 = require("../../middlewares/authrization/admin.middleware");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth.service");
const database_module_1 = require("../../database/database.module");
const oneSignal_service_1 = require("../oneSignal.service");
let AdminModule = class AdminModule {
    configure(consumer) {
        consumer.apply(decodeToken_middleware_1.decodeTokenMiddleware)
            .forRoutes('api/admin')
            .apply(admin_middleware_1.AdminMiddleware)
            .forRoutes('api/admin/*');
    }
};
AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            jwt_1.JwtModule.register({
                secret: 'yasdmfy',
                signOptions: { expiresIn: '1h' },
            }),
        ],
        controllers: [admin_controller_1.AdminContoller],
        providers: [auth_service_1.AuthService, admin_service_1.AdminService, decodeToken_middleware_1.decodeTokenMiddleware, admin_middleware_1.AdminMiddleware, oneSignal_service_1.OneSignalService],
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map