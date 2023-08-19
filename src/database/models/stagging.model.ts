import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Posts } from './post.model';
import { IsNotEmpty } from 'class-validator';
import { FreeLance } from './freeLance.model';
import { Service } from './service.model';
import { User } from './user.model';

@Table({ tableName: 'stagging' })
export class Stagging extends Model<Stagging> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;
@Column({type:DataType.BOOLEAN,defaultValue:false})
isPaid:boolean;

@Column({type:DataType.BOOLEAN,defaultValue:false})
isAttached:boolean;


      @ForeignKey(() => Service)
      @Column({type :DataType.INTEGER,allowNull:false})
      @IsNotEmpty({ message: 'serviceId is required' })
      serviceId: number;
    
      @BelongsTo(() => Service)
      service: Service;

      @ForeignKey(() => User)
      @Column({type :DataType.INTEGER,allowNull:false})
      @IsNotEmpty({ message: 'userId is required' })
      userId: number;
    
      @BelongsTo(() => User)
      user: User;
    
    
}
