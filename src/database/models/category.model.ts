import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table({ tableName: 'category' })
export class Category extends Model<Category> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

@Column({type:DataType.STRING})
categor:string;
}

