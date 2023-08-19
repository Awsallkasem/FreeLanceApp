import { Model, Table, Column, DataType, BeforeCreate, BelongsTo, ForeignKey, AutoIncrement, PrimaryKey, HasMany } from 'sequelize-typescript';
import { IsNotEmpty } from 'class-validator';
import { User } from './user.model';
import { Service } from './service.model';
import { FreeLance } from './freeLance.model';
import { UserRequest } from './userRequest.model';
import { StaggingToPoint } from './staggingToPoint.model';


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

    @Table({ tableName: 'postWithPoint' })
    export class postWithPoint extends Model<postWithPoint>  {
      @PrimaryKey
      @AutoIncrement
      @Column({ type: DataType.INTEGER })
      id: number;

      @Column({type: DataType.ENUM(...Object.values(FreelanceCategory)), allowNull: false })
  @IsNotEmpty({ message: 'category is required' })
  category: FreelanceCategory;


      @Column({type:DataType.STRING, allowNull: false })
      @IsNotEmpty({ message: 'content is required' })
      content: string;
      
      @Column({ type: DataType.FLOAT, allowNull: false })
      @IsNotEmpty({ message: 'price is required' })
      price: number;

      @Column({ type: DataType.FLOAT, allowNull: false })
      @IsNotEmpty({ message: 'numDays is required' })
      numDays: number;
      
      
      @ForeignKey(() => FreeLance)
      @Column({type :DataType.INTEGER,allowNull:false})
      @IsNotEmpty({ message: 'freelanceId is required' })
      freelaneId: number;
    
      @BelongsTo(() => FreeLance)
      freelane: FreeLance;

      @HasMany(()=>UserRequest,{ onDelete: 'cascade', hooks:true })
      userRequest:UserRequest[];

  @HasMany(()=>StaggingToPoint,{ onDelete: 'cascade', hooks:true })
      stagging:StaggingToPoint[];


    }  