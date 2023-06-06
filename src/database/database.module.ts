import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Published } from './models/Publish.model';
import { Rank } from './models/rank.model';
import { FreeLance } from './models/freeLance.model';
import { Sequelize } from 'sequelize';
import { Service } from './models/service.model';


@Module({
  imports:[SequelizeModule.forFeature([User,Published,Rank,Service,FreeLance])],
  providers: [...databaseProviders],
  exports: [...databaseProviders,SequelizeModule],
})
export class DatabaseModule { }