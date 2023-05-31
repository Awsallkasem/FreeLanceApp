import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Published } from './Publish.model';
import { IsNotEmpty } from 'class-validator';
import { User } from './user.model';
import { FreeLance } from './freeLance.model';

@Table({ tableName: 'rank' })
export class Rank extends Model<Rank> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    @IsNotEmpty({ message: 'Rank is required' })
    rank: number


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
