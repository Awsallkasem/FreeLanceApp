"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayPalModule = void 0;
const common_1 = require("@nestjs/common");
const payments_controller_1 = require("./payments.controller");
const payments_service_1 = require("./payments.service");
const decodeToken_middleware_1 = require("../../middlewares/authrization/decodeToken.middleware");
const database_module_1 = require("../../database/database.module");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth.service");
let PayPalModule = class PayPalModule {
    configure(consumer) {
        consumer.apply(decodeToken_middleware_1.decodeTokenMiddleware)
            .forRoutes('api/payments/*');
    }
};
PayPalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            jwt_1.JwtModule.register({
                secret: 'yasdmfy',
                signOptions: { expiresIn: '1h' },
            }),
        ],
        controllers: [payments_controller_1.PayPalController],
        providers: [payments_service_1.paymentService, auth_service_1.AuthService, decodeToken_middleware_1.decodeTokenMiddleware],
    })
], PayPalModule);
exports.PayPalModule = PayPalModule;
//# sourceMappingURL=payaments.module.js.map