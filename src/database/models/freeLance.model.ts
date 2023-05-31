import { Model, Table, Column, DataType, BeforeCreate, BelongsTo, ForeignKey, AutoIncrement, PrimaryKey, HasMany } from 'sequelize-typescript';
import { IsNotEmpty } from 'class-validator';
import { User } from './user.model';
import { Rank } from './rank.model';



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

@Column({type:DataType.INTEGER,defaultValue:0})
rank:number

@Column({type:DataType.INTEGER,defaultValue:0})
number:number

  @ForeignKey(() => User)
  @Column({type:DataType.INTEGER,allowNull:false})
  @IsNotEmpty({ message: 'userId is required' })
  userId: number;


  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Rank)
  ranks: Rank[];

  }
