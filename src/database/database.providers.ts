import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/database/models/user.model';
import { Posts } from './models/post.model';
import { Rating } from './models/rating.model';
import { FreeLance } from './models/freeLance.model';
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


export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost'||process.env.DB_HOST,
        port: 3306|| parseInt(process.env.DB_PORT),
        username: 'free'||process.env.DB_USERNAME,
        password: 'free'|| process.env.DB_PASSWORD,
        database: 'free'||process.env.DB_DATABASE,
        logging:false
      });

      sequelize.addModels([User, Posts,Rating,Packgs,Service,PayAndRecive,postWithPoint,Complaint,Category,UserRequest,StaggingToPoint,FreeLance,Ineterest,Payment,Payout,Stagging]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
