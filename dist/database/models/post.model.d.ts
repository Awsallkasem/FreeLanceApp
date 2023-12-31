import { Model } from 'sequelize-typescript';
import { User } from './user.model';
import { Service } from './service.model';
export declare enum FreelanceCategory {
    WebDevelopment = "Web Development",
    MobileDevelopment = "Mobile Development",
    GraphicDesign = "Graphic Design",
    WritingTranslation = "Writing/Translation",
    DigitalMarketing = "Digital Marketing",
    VideoAnimation = "Video/Animation",
    DataEntryAdmin = "Data Entry/Admin",
    CustomerService = "Customer Service",
    SalesMarketing = "Sales/Marketing",
    Consulting = "Consulting",
    SEO = "Search Engine Optimization (SEO)",
    ContentCreation = "Content Creation",
    UIUXDesign = "UI/UX Design",
    Photography = "Photography",
    VirtualAssistance = "Virtual Assistance",
    ProjectManagement = "Project Management",
    Transcription = "Transcription",
    Illustration = "Illustration",
    VoiceOver = "Voice Over",
    EventPlanning = "Event Planning",
    Accounting = "Accounting/Bookkeeping",
    LegalServices = "Legal Services",
    Tutoring = "Tutoring/Education",
    MusicProduction = "Music Production",
    SoftwareTesting = "Software Testing",
    BlockchainDevelopment = "Blockchain Development",
    InteriorDesign = "Interior Design",
    Architecture = "Architecture",
    GameDevelopment = "Game Development",
    AppTesting = "App Testing",
    MarketResearch = "Market Research",
    FinancialAnalysis = "Financial Analysis",
    Copywriting = "Copywriting",
    Branding = "Branding",
    DataScience = "Data Science",
    HumanResources = "Human Resources",
    LanguageInstruction = "Language Instruction",
    PodcastProduction = "Podcast Production",
    ProofreadingEditing = "Proofreading/Editing",
    ITNetworkAdministration = "IT/Network Administration",
    Blogging = "Blogging",
    FashionDesign = "Fashion Design",
    FitnessTraining = "Fitness Training",
    ResumeWriting = "Resume Writing",
    PublicRelations = "Public Relations",
    MarketAnalysis = "Market Analysis",
    Cybersecurity = "Cybersecurity",
    EventPhotography = "Event Photography",
    EcommerceDevelopment = "E-commerce Development",
    DataVisualization = "Data Visualization",
    Animation = "Animation",
    GrantWriting = "Grant Writing",
    MedicalWriting = "Medical Writing",
    ResearchWriting = "Research Writing",
    PodcastEditing = "Podcast Editing",
    UXResearch = "UX Research",
    AppDevelopment = "App Development",
    BlogManagement = "Blog Management",
    ProductManagement = "Product Management",
    MarketStrategy = "Market Strategy",
    LanguageTranslation = "Language Translation",
    TechnicalWriting = "Technical Writing",
    DataEntry = "Data Entry",
    MusicComposition = "Music Composition",
    LegalWriting = "Legal Writing",
    VirtualReality = "Virtual Reality",
    VideoEditing = "Video Editing",
    MachineLearning = "Machine Learning",
    PhotoEditing = "Photo Editing",
    GameDesign = "Game Design",
    UIDesign = "UI Design",
    UXDesign = "UX Design",
    EventManagement = "Event Management",
    SocialMediaAdvertising = "Social Media Advertising",
    Copyediting = "Copyediting",
    ResumeDesign = "Resume Design",
    ITConsulting = "IT Consulting",
    BusinessConsulting = "Business Consulting",
    LogoDesign = "Logo Design",
    InfographicDesign = "Infographic Design",
    VoiceActing = "Voice Acting",
    ContentMarketing = "Content Marketing",
    Scriptwriting = "Scriptwriting",
    BusinessPlanWriting = "Business Plan Writing",
    PhotoRetouching = "Photo Retouching",
    SEOWriting = "SEO Writing",
    DataAnalysis = "Data Analysis",
    HRConsulting = "HR Consulting",
    UXDesignResearch = "UX Design Research",
    TechnicalSupport = "Technical Support"
}
export declare class Posts extends Model<Posts> {
    id: number;
    content: string;
    category: FreelanceCategory;
    services: Service[];
    userId: number;
    user: User;
}
