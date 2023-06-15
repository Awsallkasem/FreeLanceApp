import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { decodeTokenMiddleware } from 'src/middlewares/authrization/decodeToken.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/app/auth/auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { FreeLanceService } from 'src/app/freeLance/freeLance.service';
import { PaymentsController } from './payments.controller';
import { paymentService } from './payments.service';
import { UserMiddleware } from 'src/middlewares/authrization/user.middleware';

@Module({
  imports: [
    DatabaseModule,

    JwtModule.register({
      secret: 'yasdmfy', // Replace with your own secret key
      signOptions: { expiresIn: '1h' }, // Configure token expiration
    }),
  ],
  controllers: [PaymentsController],
  providers: [AuthService,paymentService, FreeLanceService, decodeTokenMiddleware, UserMiddleware],
})
export class PaymentsMoudle implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(decodeTokenMiddleware)
      .forRoutes('api/payments/*')
      .apply(UserMiddleware)
      .forRoutes('api/payments/*');

  }
}

  