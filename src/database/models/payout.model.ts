import { Model, Table, Column, DataType, BelongsTo, ForeignKey, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import { IsNotEmpty } from 'class-validator';
import { FreeLance } from './freeLance.model';



@Table({ tableName: 'payout' })
export class Payout extends Model<Payout>{
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

@ForeignKey(()=>FreeLance)
@Column({type:DataType.INTEGER,allowNull:false})
@IsNotEmpty({ message: 'freeLanceId is required' })
freeLanceId: number;

@BelongsTo(() => FreeLance)
freeLance: FreeLance;

}
