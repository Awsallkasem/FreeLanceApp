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
exports.User = exports.UserRole = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const class_validator_1 = require("class-validator");
const post_model_1 = require("./post.model");
const freeLance_model_1 = require("./freeLance.model");
const rating_model_1 = require("./rating.model");
const payment_model_1 = require("./payment.model");
const payAndRecive_model_1 = require("./payAndRecive.model");
const sequelize_1 = require("sequelize");
const complaint_model_1 = require("./complaint.model");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
    UserRole["FreeLnce"] = "freelance";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
let User = class User extends sequelize_typescript_1.Model {
    static async statisticalsNumUser(year) {
        return await this.findAll({
            attributes: [
                [this.sequelize.fn('YEARWEEK', this.sequelize.col('createdAt'), 0), 'week'],
                [this.sequelize.col('role'), 'role'],
                [this.sequelize.fn('COUNT', this.sequelize.col('role')), 'roleCount']
            ],
            group: [this.sequelize.fn('YEARWEEK', this.sequelize.col('createdAt'), 0), 'role'],
            where: { [sequelize_1.Op.and]: [
                    this.sequelize.where(this.sequelize.fn('YEAR', this.sequelize.col('createdAt')), year),
                    { role: UserRole.USER }
                ] },
            raw: true,
        });
    }
    static async statisticalsNumFreeLance(year) {
        return await this.findAll({
            attributes: [
                [this.sequelize.fn('YEARWEEK', this.sequelize.col('createdAt'), 0), 'week'],
                [this.sequelize.col('role'), 'role'],
                [this.sequelize.fn('COUNT', this.sequelize.col('role')), 'roleCount']
            ],
            group: [this.sequelize.fn('YEARWEEK', this.sequelize.col('createdAt'), 0), 'role'],
            where: { [sequelize_1.Op.and]: [
                    this.sequelize.where(this.sequelize.fn('YEAR', this.sequelize.col('createdAt')), year),
                    { role: UserRole.FreeLnce }
                ] },
            raw: true,
        });
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM(...Object.values(UserRole)), allowNull: false }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Role is required' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true, allowNull: false }),
    (0, class_validator_1.IsNotEmpty)({ message: 'email is required' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    (0, class_validator_1.IsNotEmpty)({ message: 'location is required' }),
    __metadata("design:type", String)
], User.prototype, "location", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    (0, class_validator_1.IsNotEmpty)({ message: ' Fname is required' }),
    __metadata("design:type", String)
], User.prototype, "Fname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    (0, class_validator_1.IsNotEmpty)({ message: ' Lname is required' }),
    __metadata("design:type", String)
], User.prototype, "Lname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, validate: { len: [8, 255] } }),
    (0, class_validator_1.Length)(8, 255, { message: 'pasword must be 10 characters long' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(10) }),
    (0, class_validator_1.Length)(10, 10, { message: 'Phone must be 10 characters long' }),
    (0, class_validator_1.IsString)({ message: 'phone number must be a string' }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, defaultValue: 0 }),
    __metadata("design:type", Number)
], User.prototype, "walletBalance", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, defaultValue: 0 }),
    __metadata("design:type", Number)
], User.prototype, "point", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isReject", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isBlocked", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY }),
    __metadata("design:type", Date)
], User.prototype, "Activatedat", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => post_model_1.Posts, { onDelete: 'cascade', hooks: true }),
    __metadata("design:type", Array)
], User.prototype, "publisheds", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => freeLance_model_1.FreeLance, { onDelete: 'cascade', hooks: true }),
    __metadata("design:type", freeLance_model_1.FreeLance)
], User.prototype, "freeLances", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => rating_model_1.Rating, { onDelete: 'cascade', hooks: true }),
    __metadata("design:type", Array)
], User.prototype, "ranks", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => payment_model_1.Payment, { onDelete: 'cascade', hooks: true }),
    __metadata("design:type", Array)
], User.prototype, "payments", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => payAndRecive_model_1.PayAndRecive, { onDelete: 'cascade', hooks: true }),
    __metadata("design:type", payAndRecive_model_1.PayAndRecive)
], User.prototype, "payAndRecive", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => complaint_model_1.Complaint, { onDelete: 'cascade', hooks: true }),
    __metadata("design:type", complaint_model_1.Complaint)
], User.prototype, "complaint", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'users' })
], User);
exports.User = User;
//# sourceMappingURL=user.model.js.map