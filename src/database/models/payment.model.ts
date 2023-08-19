import { Model, Table, Column, DataType, BelongsTo, ForeignKey, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import { IsNotEmpty } from 'class-validator';
import { User } from './user.model';
import { FreeLance } from './freeLance.model';



@Table({ tableName: 'payment' })
export class Payment extends Model<Payment>{
@PrimaryKey
@AutoIncrement
@Column({type:DataType.INTEGER})
id: number;



@Column({type:DataType.INTEGER,allowNull:false})
@IsNotEmpty({ message: 'amount is required' })
amount:number;

@Column({
    type: DataType.DATEONLY, 
  })
  date: Date;

@ForeignKey(()=>User)
@Column({type:DataType.INTEGER,allowNull:false})
@IsNotEmpty({ message: 'userId is required' })
userId: number;

@BelongsTo(() => User)
user: User;

}
