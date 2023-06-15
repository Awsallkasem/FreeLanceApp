"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsMoudle = void 0;
const common_1 = require("@nestjs/common");
const decodeToken_middleware_1 = require("../../middlewares/authrization/decodeToken.middleware");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth.service");
const database_module_1 = require("../../database/database.module");
const freeLance_service_1 = require("../freeLance/freeLance.service");
const payments_controller_1 = require("./payments.controller");
const payments_service_1 = require("./payments.service");
const user_middleware_1 = require("../../middlewares/authrization/user.middleware");
let PaymentsMoudle = class PaymentsMoudle {
    configure(consumer) {
        consumer.apply(decodeToken_middleware_1.decodeTokenMiddleware)
            .forRoutes('api/payments/*')
            .apply(user_middleware_1.UserMiddleware)
            .forRoutes('api/payments/*');
    }
};
PaymentsMoudle = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            jwt_1.JwtModule.register({
                secret: 'yasdmfy',
                signOptions: { expiresIn: '1h' },
            }),
        ],
        controllers: [payments_controller_1.PaymentsController],
        providers: [auth_service_1.AuthService, payments_service_1.paymentService, freeLance_service_1.FreeLanceService, decodeToken_middleware_1.decodeTokenMiddleware, user_middleware_1.UserMiddleware],
    })
], PaymentsMoudle);
exports.PaymentsMoudle = PaymentsMoudle;
//# sourceMappingURL=payaments.module.js.map