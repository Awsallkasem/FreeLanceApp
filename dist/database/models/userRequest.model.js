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
exports.UserRequest = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const class_validator_1 = require("class-validator");
const user_model_1 = require("./user.model");
const postWithPoint_model_1 = require("./postWithPoint.model");
const staggingToPoint_model_1 = require("./staggingToPoint.model");
let UserRequest = class UserRequest extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], UserRequest.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: false }),
    __metadata("design:type", Boolean)
], UserRequest.prototype, "isAcceppted", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: false }),
    __metadata("design:type", Boolean)
], UserRequest.prototype, "isRejected", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], UserRequest.prototype, "filePath", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    (0, class_validator_1.IsNotEmpty)({ message: 'userId is required' }),
    __metadata("design:type", Number)
], UserRequest.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], UserRequest.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => postWithPoint_model_1.postWithPoint),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    (0, class_validator_1.IsNotEmpty)({ message: 'postId is required' }),
    __metadata("design:type", Number)
], UserRequest.prototype, "postId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => postWithPoint_model_1.postWithPoint),
    __metadata("design:type", postWithPoint_model_1.postWithPoint)
], UserRequest.prototype, "post", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => staggingToPoint_model_1.StaggingToPoint),
    __metadata("design:type", staggingToPoint_model_1.StaggingToPoint)
], UserRequest.prototype, "stagging", void 0);
UserRequest = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'userRequest' })
], UserRequest);
exports.UserRequest = UserRequest;
//# sourceMappingURL=userRequest.model.js.map