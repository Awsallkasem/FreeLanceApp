import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Published } from './models/Publish.model';
import { Rank } from './models/rank.model';
import { FreeLance } from './models/freeLance.model';
import { Sequelize } from 'sequelize';


@Module({
  imports:[SequelizeModule.forFeature([User,Published,Rank,FreeLance])],
  providers: [...databaseProviders],
  exports: [...databaseProviders,SequelizeModule],
})
export class DatabaseModule { }