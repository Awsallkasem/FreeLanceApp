import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './app/user/user.module';
import { AdminModule } from './app/admin/admin.module';
import { FreeLacneModule } from './app/freeLance/freeLance.module';
import { PayPalModule } from './app/payments/payaments.module';
import { sequelizeConfig } from './config/sequelize.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategorySeed } from './database/seeds/categoryseed/category.seed';
import { OneSignalService } from './app/oneSignal.service';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    
    DatabaseModule,
    UserModule,
    FreeLacneModule,
    AdminModule,
    PayPalModule,
  ],
  providers: [CategorySeed,OneSignalService], 
  controllers:[]
})
export class AppModule { 

  // constructor(private readonly categorySeed: CategorySeed) {
  //   this.categorySeed.seedCategories().then(() => {
  //     console.log('Categories seeded successfully.');
  //   });
  // }
}



