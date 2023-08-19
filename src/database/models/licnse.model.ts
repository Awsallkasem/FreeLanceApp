import { Model, Table, Column, DataType, BelongsTo, ForeignKey, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import { IsNotEmpty } from 'class-validator';
import { User } from './user.model';
import { FreeLance } from './freeLance.model';



@Table({ tableName: 'licnse' })
export class Licens extends Model<Licens>{
@PrimaryKey
@AutoIncrement
@Column({type:DataType.INTEGER})
id: number;



@Column({type:DataType.INTEGER,allowNull:false})
@IsNotEmpty({ message: 'amount is required' })
amount:number;

}
