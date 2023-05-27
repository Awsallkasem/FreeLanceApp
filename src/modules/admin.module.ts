import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminContoller } from '../controllers/admin.controller';
import { AdminService } from '../services/admin.service';
import { User } from '../database/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { decodeTokenMiddleware } from 'src/middlewares/authrization/decodeToken.middleware';
import {  AdminMiddleware} from 'src/middlewares/authrization/admin.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/services/auth.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
        secret: 'yasdmfy', // Replace with your own secret key
        signOptions: { expiresIn: '1h' }, // Configure token expiration
      }),    
  ],
  controllers: [AdminContoller],
  providers: [AuthService,AdminService,decodeTokenMiddleware,AdminMiddleware],
})
export class AdminModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(decodeTokenMiddleware)
    .forRoutes('api/admin')
    .apply(AdminMiddleware)
    .forRoutes('api/admin/*');

}
}
