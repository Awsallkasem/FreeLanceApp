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
exports.Service = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Publish_model_1 = require("./Publish.model");
const class_validator_1 = require("class-validator");
const freeLance_model_1 = require("./freeLance.model");
let Service = class Service extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Service.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.FLOAT, allowNull: false }),
    (0, class_validator_1.IsNotEmpty)({ message: 'price is required' }),
    __metadata("design:type", Number)
], Service.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.FLOAT, allowNull: false }),
    (0, class_validator_1.IsNotEmpty)({ message: 'numDays is required' }),
    __metadata("design:type", Number)
], Service.prototype, "numDays", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
    }),
    __metadata("design:type", Date)
], Service.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: false }),
    __metadata("design:type", Boolean)
], Service.prototype, "isAccepted", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Publish_model_1.Published),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    (0, class_validator_1.IsNotEmpty)({ message: 'publishedId is required' }),
    __metadata("design:type", Number)
], Service.prototype, "publishedId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Publish_model_1.Published),
    __metadata("design:type", Publish_model_1.Published)
], Service.prototype, "published", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => freeLance_model_1.FreeLance),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    (0, class_validator_1.IsNotEmpty)({ message: 'freelanceId is required' }),
    __metadata("design:type", Number)
], Service.prototype, "freelaneId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => freeLance_model_1.FreeLance),
    __metadata("design:type", freeLance_model_1.FreeLance)
], Service.prototype, "freelane", void 0);
Service = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'service' })
], Service);
exports.Service = Service;
//# sourceMappingURL=service.model.js.map