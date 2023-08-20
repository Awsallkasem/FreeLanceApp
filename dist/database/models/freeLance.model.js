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
exports.FreeLance = exports.JobTittle = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const class_validator_1 = require("class-validator");
const user_model_1 = require("./user.model");
const rating_model_1 = require("./rating.model");
const service_model_1 = require("./service.model");
const payout_model_1 = require("./payout.model");
const postWithPoint_model_1 = require("./postWithPoint.model");
const payAndRecive_model_1 = require("./payAndRecive.model");
var JobTittle;
(function (JobTittle) {
    JobTittle["BackEndDeveloper"] = "backend-developer";
    JobTittle["FrontEndDeveloper"] = "frontend-developer";
    JobTittle["SystemAnalyzer"] = "system_analyzer";
    JobTittle["Designer"] = "designer";
    JobTittle["Writer"] = "writer";
    JobTittle["SocialMediaInf"] = "social_media_inf";
    JobTittle["ContentCreator"] = "content_creator";
})(JobTittle = exports.JobTittle || (exports.JobTittle = {}));
let FreeLance = class FreeLance extends sequelize_typescript_1.Model {
    async calculateRating() {
        const freeLanceRate = await rating_model_1.Rating.findAll({ where: { freelaneId: this.id } });
        if (!freeLanceRate || freeLanceRate.length === 0) {
            return 0;
        }
        const totalRating = freeLanceRate.reduce((sum, evaluation) => sum + evaluation.rating, 0);
        const averageRating = totalRating / freeLanceRate.length;
        return parseFloat(averageRating.toFixed(2));
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], FreeLance.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], FreeLance.prototype, "photoName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], FreeLance.prototype, "link", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM(...Object.values(JobTittle)), allowNull: false }),
    (0, class_validator_1.IsNotEmpty)({ message: 'jobTittle is required' }),
    __metadata("design:type", String)
], FreeLance.prototype, "jobTittle", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    (0, class_validator_1.IsNotEmpty)({ message: 'userId is required' }),
    __metadata("design:type", Number)
], FreeLance.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.FLOAT }),
    __metadata("design:type", Number)
], FreeLance.prototype, "rate", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], FreeLance.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => rating_model_1.Rating, { onDelete: 'cascade', hooks: true }),
    __metadata("design:type", Array)
], FreeLance.prototype, "rating", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => payout_model_1.Payout, { onDelete: 'cascade', hooks: true }),
    __metadata("design:type", Array)
], FreeLance.prototype, "payouts", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => service_model_1.Service, { onDelete: 'cascade', hooks: true }),
    __metadata("design:type", Array)
], FreeLance.prototype, "services", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => postWithPoint_model_1.postWithPoint, { onDelete: 'cascade', hooks: true }),
    __metadata("design:type", Array)
], FreeLance.prototype, "postPoint", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => payAndRecive_model_1.PayAndRecive, { onDelete: 'cascade', hooks: true }),
    __metadata("design:type", payAndRecive_model_1.PayAndRecive)
], FreeLance.prototype, "payAndRecive", void 0);
FreeLance = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'freeLance' })
], FreeLance);
exports.FreeLance = FreeLance;
//# sourceMappingURL=freeLance.model.js.map