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
exports.Complaint = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
const service_model_1 = require("./service.model");
const class_validator_1 = require("class-validator");
const post_model_1 = require("./post.model");
let Complaint = class Complaint extends sequelize_typescript_1.Model {
    static async statisticalComplaints() {
        return await this.findAll({
            attributes: [
                [this.sequelize.col('service.published.category'), 'category'],
                [this.sequelize.fn('COUNT', this.sequelize.col('category')), 'categoryCount']
            ],
            include: [
                {
                    model: service_model_1.Service,
                    include: [{
                            model: post_model_1.Posts,
                            as: 'published',
                            attributes: ['category']
                        }
                    ],
                    attributes: [],
                },
            ],
            group: [this.sequelize.col('service.published.category')],
            raw: true,
        });
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Complaint.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Complaint.prototype, "content", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => service_model_1.Service),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    (0, class_validator_1.IsNotEmpty)({ message: 'serviceId is required' }),
    __metadata("design:type", Number)
], Complaint.prototype, "serviceId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => service_model_1.Service),
    __metadata("design:type", service_model_1.Service)
], Complaint.prototype, "service", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    (0, class_validator_1.IsNotEmpty)({ message: 'userId is required' }),
    __metadata("design:type", Number)
], Complaint.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Complaint.prototype, "user", void 0);
Complaint = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'complaint' })
], Complaint);
exports.Complaint = Complaint;
//# sourceMappingURL=complaint.model.js.map