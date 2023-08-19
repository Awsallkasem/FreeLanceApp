import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './app/user/user.module';
import { AdminModule } from './app/admin/admin.module';
import { FreeLacneModule } from './app/freeLance/freeLance.module';
import { PayPalModule } from './app/payments/payaments.module';
import { sequelizeConfig } from './config/sequelize.config';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    DatabaseModule,
    
    UserModule,
    FreeLacneModule,
    AdminModule,
    PayPalModule

  ],
  controllers:[]
})
export class AppModule { }
