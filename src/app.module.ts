import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './database/models/user.model';
import { AuthModule } from './modules/auth.module';
import { sequelizeConfig } from './config/sequelize.config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user.module';
import { AdminModule } from './modules/admin.module';
import { FreeLance } from './database/models/freeLance.model';
import { Rank } from './database/models/rank.model';
import { Published } from './database/models/Publish.model';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    DatabaseModule,
    UserModule,
    AdminModule,
    DatabaseModule
  ],
})
export class AppModule { }
