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
exports.Ineterest = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const freeLance_model_1 = require("./freeLance.model");
const class_validator_1 = require("class-validator");
let Ineterest = class Ineterest extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Ineterest.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Ineterest.prototype, "categor", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => freeLance_model_1.FreeLance),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    (0, class_validator_1.IsNotEmpty)({ message: 'freelanceId is required' }),
    __metadata("design:type", Number)
], Ineterest.prototype, "freelaneId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => freeLance_model_1.FreeLance),
    __metadata("design:type", freeLance_model_1.FreeLance)
], Ineterest.prototype, "freelane", void 0);
Ineterest = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'interest' })
], Ineterest);
exports.Ineterest = Ineterest;
//# sourceMappingURL=interest.model.js.map