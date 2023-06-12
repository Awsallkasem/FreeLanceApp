import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { IsNotEmpty, Max, Min } from 'class-validator';
import { User } from './user.model';
import { FreeLance } from './freeLance.model';

@Table({ tableName: 'rating' })
export class Rating extends Model<Rating> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column({ type: DataType.INTEGER, allowNull: false,validate: { min: 0.5, max: 5 } })
    @Min(0.01, { message: 'Value must be greater than or equal to 0.01' })
    @Max(5, { message: 'Value must be less than or equal to 5' })
    rating: number
    


    @ForeignKey(() => User)
    @Column({type :DataType.INTEGER,allowNull:false})
    @IsNotEmpty({ message: 'UserId is required' })
    userId: number;
  
    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => FreeLance)
    @Column({type :DataType.INTEGER,allowNull:false})
    @IsNotEmpty({ message: 'freelanceId is required' })
    freelaneId: number;
  
    @BelongsTo(() => FreeLance)
    freelane: FreeLance;




    
    
}

