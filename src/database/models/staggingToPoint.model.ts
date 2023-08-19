import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Posts } from './post.model';
import { IsNotEmpty } from 'class-validator';
import { FreeLance } from './freeLance.model';
import { Service } from './service.model';
import { User } from './user.model';
import { postWithPoint } from './postWithPoint.model';
import { UserRequest } from './userRequest.model';

@Table({ tableName: 'staggingToPoint' })
export class StaggingToPoint extends Model<StaggingToPoint> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;
@Column({type:DataType.BOOLEAN,defaultValue:false})
isPaid:boolean;

@Column({type:DataType.BOOLEAN,defaultValue:false})
isAttached:boolean;


      @ForeignKey(() => postWithPoint)
      @Column({type :DataType.INTEGER,allowNull:false})
      @IsNotEmpty({ message: 'serviceId is required' })
      postId: number;
    
      @BelongsTo(() => postWithPoint)
      post: postWithPoint;

      @ForeignKey(() => UserRequest)
      @Column({type :DataType.INTEGER,allowNull:false})
      @IsNotEmpty({ message: 'userId is required' })
      userRequestId: number;
    
      @BelongsTo(() => UserRequest)
      userRequest: UserRequest;
    
    
}
