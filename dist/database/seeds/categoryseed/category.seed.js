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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySeed = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const category_model_1 = require("../../models/category.model");
var FreelanceCategory;
(function (FreelanceCategory) {
    FreelanceCategory["WebDevelopment"] = "Web Development";
    FreelanceCategory["MobileDevelopment"] = "Mobile Development";
    FreelanceCategory["GraphicDesign"] = "Graphic Design";
    FreelanceCategory["WritingTranslation"] = "Writing/Translation";
    FreelanceCategory["DigitalMarketing"] = "Digital Marketing";
    FreelanceCategory["VideoAnimation"] = "Video/Animation";
    FreelanceCategory["DataEntryAdmin"] = "Data Entry/Admin";
    FreelanceCategory["CustomerService"] = "Customer Service";
    FreelanceCategory["SalesMarketing"] = "Sales/Marketing";
    FreelanceCategory["Consulting"] = "Consulting";
    FreelanceCategory["SEO"] = "Search Engine Optimization (SEO)";
    FreelanceCategory["ContentCreation"] = "Content Creation";
    FreelanceCategory["UIUXDesign"] = "UI/UX Design";
    FreelanceCategory["Photography"] = "Photography";
    FreelanceCategory["VirtualAssistance"] = "Virtual Assistance";
    FreelanceCategory["ProjectManagement"] = "Project Management";
    FreelanceCategory["Transcription"] = "Transcription";
    FreelanceCategory["Illustration"] = "Illustration";
    FreelanceCategory["VoiceOver"] = "Voice Over";
    FreelanceCategory["EventPlanning"] = "Event Planning";
    FreelanceCategory["Accounting"] = "Accounting/Bookkeeping";
    FreelanceCategory["LegalServices"] = "Legal Services";
    FreelanceCategory["Tutoring"] = "Tutoring/Education";
    FreelanceCategory["MusicProduction"] = "Music Production";
    FreelanceCategory["SoftwareTesting"] = "Software Testing";
    FreelanceCategory["BlockchainDevelopment"] = "Blockchain Development";
    FreelanceCategory["InteriorDesign"] = "Interior Design";
    FreelanceCategory["Architecture"] = "Architecture";
    FreelanceCategory["GameDevelopment"] = "Game Development";
    FreelanceCategory["AppTesting"] = "App Testing";
    FreelanceCategory["MarketResearch"] = "Market Research";
    FreelanceCategory["FinancialAnalysis"] = "Financial Analysis";
    FreelanceCategory["Copywriting"] = "Copywriting";
    FreelanceCategory["Branding"] = "Branding";
    FreelanceCategory["DataScience"] = "Data Science";
    FreelanceCategory["HumanResources"] = "Human Resources";
    FreelanceCategory["LanguageInstruction"] = "Language Instruction";
    FreelanceCategory["PodcastProduction"] = "Podcast Production";
    FreelanceCategory["ProofreadingEditing"] = "Proofreading/Editing";
    FreelanceCategory["ITNetworkAdministration"] = "IT/Network Administration";
    FreelanceCategory["Blogging"] = "Blogging";
    FreelanceCategory["FashionDesign"] = "Fashion Design";
    FreelanceCategory["FitnessTraining"] = "Fitness Training";
    FreelanceCategory["ResumeWriting"] = "Resume Writing";
    FreelanceCategory["PublicRelations"] = "Public Relations";
    FreelanceCategory["MarketAnalysis"] = "Market Analysis";
    FreelanceCategory["Cybersecurity"] = "Cybersecurity";
    FreelanceCategory["EventPhotography"] = "Event Photography";
    FreelanceCategory["EcommerceDevelopment"] = "E-commerce Development";
    FreelanceCategory["DataVisualization"] = "Data Visualization";
    FreelanceCategory["Animation"] = "Animation";
    FreelanceCategory["GrantWriting"] = "Grant Writing";
    FreelanceCategory["MedicalWriting"] = "Medical Writing";
    FreelanceCategory["ResearchWriting"] = "Research Writing";
    FreelanceCategory["PodcastEditing"] = "Podcast Editing";
    FreelanceCategory["UXResearch"] = "UX Research";
    FreelanceCategory["AppDevelopment"] = "App Development";
    FreelanceCategory["BlogManagement"] = "Blog Management";
    FreelanceCategory["ProductManagement"] = "Product Management";
    FreelanceCategory["MarketStrategy"] = "Market Strategy";
    FreelanceCategory["LanguageTranslation"] = "Language Translation";
    FreelanceCategory["TechnicalWriting"] = "Technical Writing";
    FreelanceCategory["DataEntry"] = "Data Entry";
    FreelanceCategory["MusicComposition"] = "Music Composition";
    FreelanceCategory["LegalWriting"] = "Legal Writing";
    FreelanceCategory["VirtualReality"] = "Virtual Reality";
    FreelanceCategory["VideoEditing"] = "Video Editing";
    FreelanceCategory["MachineLearning"] = "Machine Learning";
    FreelanceCategory["PhotoEditing"] = "Photo Editing";
    FreelanceCategory["GameDesign"] = "Game Design";
    FreelanceCategory["UIDesign"] = "UI Design";
    FreelanceCategory["UXDesign"] = "UX Design";
    FreelanceCategory["EventManagement"] = "Event Management";
    FreelanceCategory["SocialMediaAdvertising"] = "Social Media Advertising";
    FreelanceCategory["Copyediting"] = "Copyediting";
    FreelanceCategory["ResumeDesign"] = "Resume Design";
    FreelanceCategory["ITConsulting"] = "IT Consulting";
    FreelanceCategory["BusinessConsulting"] = "Business Consulting";
    FreelanceCategory["LogoDesign"] = "Logo Design";
    FreelanceCategory["InfographicDesign"] = "Infographic Design";
    FreelanceCategory["VoiceActing"] = "Voice Acting";
    FreelanceCategory["ContentMarketing"] = "Content Marketing";
    FreelanceCategory["Scriptwriting"] = "Scriptwriting";
    FreelanceCategory["BusinessPlanWriting"] = "Business Plan Writing";
    FreelanceCategory["PhotoRetouching"] = "Photo Retouching";
    FreelanceCategory["SEOWriting"] = "SEO Writing";
    FreelanceCategory["DataAnalysis"] = "Data Analysis";
    FreelanceCategory["HRConsulting"] = "HR Consulting";
    FreelanceCategory["UXDesignResearch"] = "UX Design Research";
    FreelanceCategory["TechnicalSupport"] = "Technical Support";
})(FreelanceCategory || (FreelanceCategory = {}));
let CategorySeed = class CategorySeed {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async seedCategories() {
        const enumValues = Object.values(FreelanceCategory);
        await Promise.all(enumValues.map(async (value) => {
            await this.categoryModel.create({
                categor: value,
            });
        }));
    }
};
CategorySeed = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(category_model_1.Category)),
    __metadata("design:paramtypes", [Object])
], CategorySeed);
exports.CategorySeed = CategorySeed;
//# sourceMappingURL=category.seed.js.map