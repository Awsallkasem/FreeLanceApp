import { Model, Table, Column, DataType, HasMany, PrimaryKey, AutoIncrement, HasOne } from 'sequelize-typescript';
import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator';
import { Published } from './Publish.model';
import { FreeLance } from './freeLance.model';
import { Rating } from './rating.model';
import { Payment } from './payment.model';



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
  @IsNotEmpty({ message: ' name is required' })
  Fname: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @IsNotEmpty({ message: ' name is required' })
  Lname: string;


  @Column({ type: DataType.STRING, validate: { len: [8, 255] } })
  @Length(8, 255, { message: 'pasword must be 10 characters long' })
  password: string;


  @Column({ type: DataType.STRING(10) })
  @Length(10, 10, { message: 'Phone must be 10 characters long' })
  @IsString({ message: 'phone number must be a string' })
  phone: string;


  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isActive: boolean

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isReject: boolean

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isBlocked: boolean

   @HasMany(() => Published)
  publisheds: Published[];

  @HasOne(() => FreeLance)
  freeLances: FreeLance;

  @HasMany(() => Rating)
  ranks: Published[];


  @HasMany(() => Payment)
  payments: Payment[];



}









