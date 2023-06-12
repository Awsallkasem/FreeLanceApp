import { Model, Table, Column, DataType, BeforeCreate, BelongsTo, ForeignKey, AutoIncrement, PrimaryKey, HasMany } from 'sequelize-typescript';
import { IsNotEmpty } from 'class-validator';
import { User } from './user.model';
import { Rating } from './rating.model';
import { Service } from './service.model';
// import { File } from './file.model';



export enum JobTittle {
    BackEndDeveloper = 'backend-developer',
    FrontEndDeveloper = 'frontend-developer',
    SystemAnalyzer = 'system_analyzer'
  }
  

@Table({ tableName: 'freeLance' })
export class FreeLance extends Model<FreeLance>  {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING })
  photoName: string;

  @Column({ type: DataType.STRING })
  photoType: string;
 
  @Column({ type: DataType.STRING })
  link: string

  @Column({ type: DataType.ENUM(...Object.values(JobTittle)) ,allowNull:false})
  @IsNotEmpty({ message: 'jobTittle is required' })
  jobTittle: JobTittle

  @ForeignKey(() => User)
  @Column({type:DataType.INTEGER,allowNull:false})
  @IsNotEmpty({ message: 'userId is required' })
  userId: number;


  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Rating)
  rating: Rating[];
  
  
  @HasMany(() => Service)
  services: Service[];

  async calculateRating(): Promise<number> {
const freeLanceRate= await Rating.findAll({where:{freelaneId:this.id}})
  if (!freeLanceRate || freeLanceRate.length === 0) {
    return 0; 
  }
  const totalRating = freeLanceRate.reduce((sum, evaluation) => sum + evaluation.rating, 0);
  const averageRating = totalRating / freeLanceRate.length;
  return  parseFloat(averageRating.toFixed(2));
}


  }
