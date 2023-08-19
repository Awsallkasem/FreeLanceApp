import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table({ tableName: 'packg' })
export class Packgs extends Model<Packgs> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

@Column({type:DataType.INTEGER})
amout:number;


@Column({type:DataType.INTEGER})
price:number;
}

