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
const rank_model_1 = require("./rank.model");
var JobTittle;
(function (JobTittle) {
    JobTittle["BackEndDeveloper"] = "backend-developer";
    JobTittle["FrontEndDeveloper"] = "frontend-developer";
    JobTittle["SystemAnalyzer"] = "system_analyzer";
})(JobTittle = exports.JobTittle || (exports.JobTittle = {}));
let FreeLance = class FreeLance extends sequelize_typescript_1.Model {
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
], FreeLance.prototype, "photoType", void 0);
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
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, defaultValue: 0 }),
    __metadata("design:type", Number)
], FreeLance.prototype, "rank", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, defaultValue: 0 }),
    __metadata("design:type", Number)
], FreeLance.prototype, "number", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    (0, class_validator_1.IsNotEmpty)({ message: 'userId is required' }),
    __metadata("design:type", Number)
], FreeLance.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], FreeLance.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => rank_model_1.Rank),
    __metadata("design:type", Array)
], FreeLance.prototype, "ranks", void 0);
FreeLance = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'freeLance' })
], FreeLance);
exports.FreeLance = FreeLance;
//# sourceMappingURL=freeLance.model.js.map