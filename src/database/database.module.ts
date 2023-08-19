import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Posts } from './models/post.model';
import { Rating } from './models/rating.model';
import { FreeLance } from './models/freeLance.model';
import { Sequelize } from 'sequelize';
import { Service } from './models/service.model';
import { Payment } from './models/payment.model';
import { Payout } from './models/payout.model';
import { Stagging } from './models/stagging.model';
import { Category } from './models/category.model';
import { Ineterest } from './models/interest.model';
import { postWithPoint } from './models/postWithPoint.model';
import { UserRequest } from './models/userRequest.model';
import { StaggingToPoint } from './models/staggingToPoint.model';
import { PayAndRecive } from './models/payAndRecive.model';
import { Complaint } from './models/complaint.model';
import { Packgs } from './models/packgs.model';


@Module({
  imports:[SequelizeModule.forFeature([User,Posts,Rating,Packgs,Service,postWithPoint,Complaint,PayAndRecive,UserRequest,StaggingToPoint,FreeLance,Payment,Payout,Ineterest,Category,Stagging])],
  providers: [...databaseProviders],
  exports: [...databaseProviders,SequelizeModule],
})
export class DatabaseModule { }