import { Model, Table, Column, DataType, HasMany, PrimaryKey, AutoIncrement, HasOne } from 'sequelize-typescript';
import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator';
import { Posts } from './post.model';
import { FreeLance } from './freeLance.model';
import { Rating } from './rating.model';
import { Payment } from './payment.model';
import { UserRequest } from './userRequest.model';
import { PayAndRecive } from './payAndRecive.model';
import { Op } from 'sequelize';
import { Complaint } from './complaint.model';



export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  FreeLnce = 'freelance',
}

export interface UserAttributes {
  id: number;
  role: UserRole;
  email: string;
  location: string;
  Fname: string;
  Lname: string;
  password: string;
  phone: string;
}


@Table({ tableName: 'users' })
export class User extends Model<User> implements UserAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({ type: DataType.ENUM(...Object.values(UserRole)), allowNull: false })
  @IsNotEmpty({ message: 'Role is required' })
  role: UserRole;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @IsNotEmpty({ message: 'location is required' })
  location: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @IsNotEmpty({ message: ' Fname is required' })
  Fname: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @IsNotEmpty({ message: ' Lname is required' })
  Lname: string;

  // @Column({ type: DataType.STRING })
  // deviceId: string;


  @Column({ type: DataType.STRING, validate: { len: [8, 255] } })
  @Length(8, 255, { message: 'pasword must be 10 characters long' })
  password: string;


  @Column({ type: DataType.STRING(10) })
  @Length(10, 10, { message: 'Phone must be 10 characters long' })
  @IsString({ message: 'phone number must be a string' })
  phone: string;

  @Column({type:DataType.INTEGER ,defaultValue: 0 })
  walletBalance: number;

  @Column({type:DataType.INTEGER ,defaultValue: 0 })
 point: number;


  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isActive: boolean

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isReject: boolean

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isBlocked: boolean

  @Column({type: DataType.DATEONLY})
  Activatedat: Date;

   @HasMany(() => Posts,{ onDelete: 'cascade', hooks:true })
  publisheds: Posts[];

  @HasOne(() => FreeLance,{ onDelete: 'cascade', hooks:true })
  freeLances: FreeLance;

  @HasMany(() => Rating,{ onDelete: 'cascade', hooks:true })
  ranks: Posts[];


  @HasMany(() => Payment,{ onDelete: 'cascade', hooks:true })
  payments: Payment[];

  @HasMany(()=>PayAndRecive,{ onDelete: 'cascade', hooks:true })
  payAndRecive:PayAndRecive;

  @HasMany(()=>Complaint,{ onDelete: 'cascade', hooks:true })
  complaint:Complaint;

  static async statisticalsNumUser(year: number): Promise<any[]> {
    return await this.findAll({
        attributes: [
            [this.sequelize.fn('YEARWEEK', this.sequelize.col('createdAt'), 0), 'week'],
            [this.sequelize.col('role'), 'role'],
            [this.sequelize.fn('COUNT', this.sequelize.col('role')), 'roleCount']
        ],
        group: [this.sequelize.fn('YEARWEEK', this.sequelize.col('createdAt'), 0), 'role'],
        where: {[Op.and]: [
          this.sequelize.where(this.sequelize.fn('YEAR', this.sequelize.col('createdAt')), year),
      {role:UserRole.USER}
        ]},
        raw: true,
    });
}


static async statisticalsNumFreeLance(year: number): Promise<any[]> {
  return await this.findAll({
      attributes: [
          [this.sequelize.fn('YEARWEEK', this.sequelize.col('createdAt'), 0), 'week'],
          [this.sequelize.col('role'), 'role'],
          [this.sequelize.fn('COUNT', this.sequelize.col('role')), 'roleCount']
      ],
      group: [this.sequelize.fn('YEARWEEK', this.sequelize.col('createdAt'), 0), 'role'],
      where: {[Op.and]: [
        this.sequelize.where(this.sequelize.fn('YEAR', this.sequelize.col('createdAt')), year),
    {role:UserRole.FreeLnce}
      ]},
      raw: true,
  });
}
}









