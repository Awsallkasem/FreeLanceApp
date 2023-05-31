import { Model, Table, Column, DataType, BeforeCreate, BelongsTo, ForeignKey, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import { IsNotEmpty } from 'class-validator';
import { User } from './user.model';

@Table({ tableName: 'publish' })
export class Published extends Model<Published>  {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  @IsNotEmpty({ message: 'content is required' })
  content: string


  @Column({ type: DataType.STRING })
  fileName: string;

  @Column({ type: DataType.STRING })
  fileType: string;


  @ForeignKey(() => User)
  @Column({type :DataType.INTEGER,allowNull:false})
  @IsNotEmpty({ message: 'UserId is required' })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BeforeCreate
  static async IsRequired(instance: Published) {

    if (instance.fileName) {
      if (!instance.fileType)
        throw new Error('Required value is missing');
    }
  }
}
