import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Published } from './Publish.model';
import { IsNotEmpty } from 'class-validator';
import { FreeLance } from './freeLance.model';

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
      date: Date;

      @ForeignKey(() => Published)
      @Column({type :DataType.INTEGER,allowNull:false})
      @IsNotEmpty({ message: 'publishedId is required' })
      publishedId: number;
    
      @BelongsTo(() => Published)
      published: Published;

      @ForeignKey(() => FreeLance)
      @Column({type :DataType.INTEGER,allowNull:false})
      @IsNotEmpty({ message: 'freelanceId is required' })
      freelaneId: number;
    
      @BelongsTo(() => FreeLance)
      freelane: FreeLance;
    
    
}
