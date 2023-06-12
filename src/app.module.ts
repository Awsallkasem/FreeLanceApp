import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './database/models/user.model';
import { AuthModule } from './app/auth/auth.module';
import { sequelizeConfig } from './config/sequelize.config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './app/user/user.module';
import { AdminModule } from './app/admin/admin.module';
import { FreeLance } from './database/models/freeLance.model';
import { Rating } from './database/models/rating.model';
import { Published } from './database/models/Publish.model';
import { FreeLacneModule } from './app/freeLance/freeLance.module';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    DatabaseModule,
    
    UserModule,
    FreeLacneModule,
    AdminModule,
    
  ],
})
export class AppModule { }
