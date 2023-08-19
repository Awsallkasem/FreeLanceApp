import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Posts } from './post.model';
import { IsNotEmpty } from 'class-validator';
import { FreeLance } from './freeLance.model';
import { Complaint } from './complaint.model';

@Table({ tableName: 'service' })
export class Service extends Model<Service> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column({ type: DataType.FLOAT, allowNull: false })
    @IsNotEmpty({ message: 'price is required' })
    price: number
 
   @Column({ type: DataType.FLOAT, allowNull: false })
    @IsNotEmpty({ message: 'numDays is required' })
    numDays: number

    @Column({
        type: DataType.DATEONLY, 
      })
      Sdate: Date;

      @Column({
        type: DataType.DATEONLY, 
      })
      Edate: Date;

      @Column({type:DataType.STRING})
      filePath:string;
      
      @Column({ type: DataType.BOOLEAN, defaultValue: false })
      isAccepted: boolean

      @ForeignKey(() => Posts)
      @Column({type :DataType.INTEGER,allowNull:false})
      @IsNotEmpty({ message: 'publishedId is required' })
      publishedId: number;
    
      @BelongsTo(() => Posts)
      published: Posts;

      @ForeignKey(() => FreeLance)
      @Column({type :DataType.INTEGER,allowNull:false})
      @IsNotEmpty({ message: 'freelanceId is required' })
      freelaneId: number;
    
      @BelongsTo(() => FreeLance)
      freelane: FreeLance;

      @HasMany(()=>Complaint,{ onDelete: 'cascade', hooks:true })
      complaint:Complaint;
    
    
}
