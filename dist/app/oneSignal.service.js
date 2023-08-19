"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneSignalService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let OneSignalService = class OneSignalService {
    constructor() {
        this.apiKey = 'ZDBiOGU4YTQtZDJhMS00N2IwLThmMzAtODdiODY5ZGZmNjAw';
        this.appId = '75ddde4b-596e-49da-9678-2772b7f54196';
    }
    async sendNotificationToUser(userId, message) {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Basic ${this.apiKey}`,
        };
        const data = {
            app_id: this.appId,
            include_player_ids: [userId],
            contents: { en: message },
        };
        try {
            await axios_1.default.post('https://onesignal.com/api/v1/notifications', data, { headers });
        }
        catch (error) {
            console.error('Error sending notification:', error);
        }
    }
};
OneSignalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], OneSignalService);
exports.OneSignalService = OneSignalService;
//# sourceMappingURL=oneSignal.service.js.map