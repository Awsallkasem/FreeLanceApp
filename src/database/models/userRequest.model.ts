import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { IsNotEmpty } from 'class-validator';
import { User } from './user.model';
import { postWithPoint } from './postWithPoint.model';
import { StaggingToPoint } from './staggingToPoint.model';

@Table({ tableName: 'userRequest' })
export class UserRequest extends Model<UserRequest> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;


    @Column({type:DataType.BOOLEAN,defaultValue:false})
    isAcceppted:boolean;
    
    @Column({type:DataType.BOOLEAN,defaultValue:false})
    isRejected:boolean;
    
    @Column({type:DataType.STRING})
    filePath:string;
    

    @ForeignKey(() => User)
    @Column({type :DataType.INTEGER,allowNull:false})
    @IsNotEmpty({ message: 'userId is required' })
    userId: number;
  
    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => postWithPoint)
    @Column({type :DataType.INTEGER,allowNull:false})
    @IsNotEmpty({ message: 'postId is required' })
    postId: number;
  
    @BelongsTo(() => postWithPoint)
    post: postWithPoint;

@HasOne(()=>StaggingToPoint)
stagging:StaggingToPoint;

    

}