import { Table, Column, Model } from 'sequelize-typescript';
import { ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Published } from './Publish.model';

@Table({ tableName: 'service' })
export class Service extends Model<Service> {
  @PrimaryGeneratedColumn()
  id: number;
  @Column
  fileType: string;
  @ManyToOne(() => Published, user => user)
  user: Published;
}
