import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Published } from './models/Publish.model';
import { Rating } from './models/rating.model';
import { FreeLance } from './models/freeLance.model';
import { Sequelize } from 'sequelize';
import { Service } from './models/service.model';
import { Payment } from './models/payment.model';


@Module({
  imports:[SequelizeModule.forFeature([User,Published,Rating,Service,FreeLance,Payment])],
  providers: [...databaseProviders],
  exports: [...databaseProviders,SequelizeModule],
})
export class DatabaseModule { }