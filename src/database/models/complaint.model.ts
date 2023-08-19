import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';
import { Service } from './service.model';
import { IsNotEmpty } from 'class-validator';
import { Posts } from './post.model';

@Table({ tableName: 'complaint' })
export class Complaint extends Model<Complaint> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column({type:DataType.STRING})
    content:string;

    @ForeignKey(() => Service)
    @Column({type :DataType.INTEGER,allowNull:false})
    @IsNotEmpty({ message: 'serviceId is required' })
    serviceId: number;
  
    @BelongsTo(() => Service)
    service: Service;

    
  @ForeignKey(() => User)
  @Column({type:DataType.INTEGER,allowNull:false})
  @IsNotEmpty({ message: 'userId is required' })
  userId: number;


  @BelongsTo(() => User)
  user: User;
 
 
  static async statisticalComplaints(): Promise<any[]> {
    return await this.findAll({
        attributes: [
            [this.sequelize.col('service.published.category'), 'category'],
            [this.sequelize.fn('COUNT', this.sequelize.col('category')), 'categoryCount']
        ],
        include: [
            {
                model: Service,
                include: [{
                    model: Posts,
                    as: 'published',
                    attributes: ['category']
                }
            ],
            attributes: [],
        },
        ],
        group: [this.sequelize.col('service.published.category')],
        raw: true,
    });
}
}

