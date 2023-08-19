import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { FreeLance } from './freeLance.model';
import { IsNotEmpty } from 'class-validator';

@Table({ tableName: 'interest' })
export class Ineterest extends Model<Ineterest> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

@Column({type:DataType.STRING})
categor:string;


@ForeignKey(() => FreeLance)
@Column({type :DataType.INTEGER,allowNull:false})
@IsNotEmpty({ message: 'freelanceId is required' })
freelaneId:  number;

@BelongsTo(() => FreeLance)
freelane: FreeLance;

}

