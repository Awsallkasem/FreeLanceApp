import { Model, Table, Column, DataType, BelongsTo, ForeignKey, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import { IsNotEmpty } from 'class-validator';
import { User } from './user.model';
import { FreeLance } from './freeLance.model';
import { Op } from 'sequelize';


export enum FreelanceCategory {
    WebDevelopment = 'Web Development',
    MobileDevelopment = 'Mobile Development',
    GraphicDesign = 'Graphic Design',
    WritingTranslation = 'Writing/Translation',
    DigitalMarketing = 'Digital Marketing',
    VideoAnimation = 'Video/Animation',
    DataEntryAdmin = 'Data Entry/Admin',
    CustomerService = 'Customer Service',
    SalesMarketing = 'Sales/Marketing',
    Consulting = 'Consulting',
    SEO = 'Search Engine Optimization (SEO)',
    ContentCreation = 'Content Creation',
    UIUXDesign = 'UI/UX Design',
    Photography = 'Photography',
    VirtualAssistance = 'Virtual Assistance',
    ProjectManagement = 'Project Management',
    Transcription = 'Transcription',
    Illustration = 'Illustration',
    VoiceOver = 'Voice Over',
    EventPlanning = 'Event Planning',
    Accounting = 'Accounting/Bookkeeping',
    LegalServices = 'Legal Services',
    Tutoring = 'Tutoring/Education',
    MusicProduction = 'Music Production',
    SoftwareTesting = 'Software Testing',
    BlockchainDevelopment = 'Blockchain Development',
    InteriorDesign = 'Interior Design',
    Architecture = 'Architecture',
    GameDevelopment = 'Game Development',
    AppTesting = 'App Testing',
    MarketResearch = 'Market Research',
    FinancialAnalysis = 'Financial Analysis',
    Copywriting = 'Copywriting',
    Branding = 'Branding',
    DataScience = 'Data Science',
    HumanResources = 'Human Resources',
    LanguageInstruction = 'Language Instruction',
    PodcastProduction = 'Podcast Production',
    ProofreadingEditing = 'Proofreading/Editing',
    ITNetworkAdministration = 'IT/Network Administration',
    Blogging = 'Blogging',
    FashionDesign = 'Fashion Design',
    FitnessTraining = 'Fitness Training',
    ResumeWriting = 'Resume Writing',
    PublicRelations = 'Public Relations',
    MarketAnalysis = 'Market Analysis',
    Cybersecurity = 'Cybersecurity',
    EventPhotography = 'Event Photography',
    EcommerceDevelopment = 'E-commerce Development',
    DataVisualization = 'Data Visualization',
    Animation = 'Animation',
    GrantWriting = 'Grant Writing',
    MedicalWriting = 'Medical Writing',
    ResearchWriting = 'Research Writing',
    PodcastEditing = 'Podcast Editing',
    UXResearch = 'UX Research',
    AppDevelopment = 'App Development',
    BlogManagement = 'Blog Management',
    ProductManagement = 'Product Management',
    MarketStrategy = 'Market Strategy',
    LanguageTranslation = 'Language Translation',
    TechnicalWriting = 'Technical Writing',
    DataEntry = 'Data Entry',
    MusicComposition = 'Music Composition',
    LegalWriting = 'Legal Writing',
    VirtualReality = 'Virtual Reality',
    VideoEditing = 'Video Editing',
    MachineLearning = 'Machine Learning',
    PhotoEditing = 'Photo Editing',
    GameDesign = 'Game Design',
    UIDesign = 'UI Design',
    UXDesign = 'UX Design',
    EventManagement = 'Event Management',
    SocialMediaAdvertising = 'Social Media Advertising',
    Copyediting = 'Copyediting',
    ResumeDesign = 'Resume Design',
    ITConsulting = 'IT Consulting',
    BusinessConsulting = 'Business Consulting',
    LogoDesign = 'Logo Design',
    InfographicDesign = 'Infographic Design',
    VoiceActing = 'Voice Acting',
    ContentMarketing = 'Content Marketing',
    Scriptwriting = 'Scriptwriting',
    BusinessPlanWriting = 'Business Plan Writing',
    PhotoRetouching = 'Photo Retouching',
    SEOWriting = 'SEO Writing',
    DataAnalysis = 'Data Analysis',
    HRConsulting = 'HR Consulting',

    UXDesignResearch = 'UX Design Research',
    TechnicalSupport = 'Technical Support',
}

@Table({ tableName: 'payAndRecive' })
export class PayAndRecive extends Model<PayAndRecive>{
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    id: number;



    @Column({ type: DataType.INTEGER, allowNull: false })
    @IsNotEmpty({ message: 'amount is required' })
    amount: number;

    @Column({ type: DataType.DATEONLY })
    date: Date;

    @Column({type:DataType.BOOLEAN,defaultValue:false})
    isByPoint:boolean;

    @Column({ type: DataType.ENUM(...Object.values(FreelanceCategory)), allowNull: false })
    @IsNotEmpty({ message: 'category is required' })
    category: FreelanceCategory;


    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    @IsNotEmpty({ message: 'userId is required' })
    userId: number;

    @BelongsTo(() => User)
    user: User;


    @ForeignKey(() => FreeLance)
    @Column({ type: DataType.INTEGER, allowNull: false })
    @IsNotEmpty({ message: 'userId is required' })
    freeLanceId: number;

    @BelongsTo(() => User)
    freeLance: FreeLance;


    static async statisticalsyear(year: number,freeLanceId :number): Promise<any[]> {
        return  await this.findAll({
            attributes: [
                [this.sequelize.fn('YEARWEEK', this.sequelize.col('date'), 0), 'week'],
                'isByPoint',
                [this.sequelize.fn('SUM', this.sequelize.col('amount')), 'totalAmount']
            ],
            group: [this.sequelize.fn('YEARWEEK', this.sequelize.col('date'),0), 'isByPoint'],
            where: {   [Op.and]: [
                this.sequelize.where(this.sequelize.fn('YEAR', this.sequelize.col('date')), year),
                { freeLanceId: freeLanceId }
            ]},
            raw: true,
        });
    }

    static async statisticalsCategoryweekly(year: number): Promise<any[]> {
        return await this.findAll({
            attributes: [
                [this.sequelize.fn('YEARWEEK', this.sequelize.col('date'), 0), 'week'],
                [this.sequelize.col('category'), 'category'],
                [this.sequelize.fn('COUNT', this.sequelize.col('category')), 'categoryCount']
            ],
            group: [this.sequelize.fn('YEARWEEK', this.sequelize.col('date'), 0), 'category'],
            where: this.sequelize.where(this.sequelize.fn('YEAR', this.sequelize.col('date')), year),
            raw: true,
        });
    }
    
    static async statisticalsCategory(): Promise<any[]> {
        return await this.findAll({
            attributes: [
                [this.sequelize.col('category'), 'category'],
                [this.sequelize.fn('COUNT', this.sequelize.col('category')), 'categoryCount']
            ],
            group: ['category'],
            raw: true,
        });
    }
    
}
