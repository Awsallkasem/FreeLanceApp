import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './config/sequelize.config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './app/user/user.module';
import { AdminModule } from './app/admin/admin.module';
import { FreeLacneModule } from './app/freeLance/freeLance.module';
import { PaymentsMoudle } from './app/payments/payaments.module';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    DatabaseModule,
    
    UserModule,
    FreeLacneModule,
    AdminModule,
    PaymentsMoudle

  ],
  controllers:[]
})
export class AppModule { }
