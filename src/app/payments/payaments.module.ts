
import { Get, MiddlewareConsumer, Module } from '@nestjs/common';
import { PayPalController } from './payments.controller';
import { paymentService } from './payments.service';
import { decodeTokenMiddleware } from 'src/middlewares/authrization/decodeToken.middleware';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    DatabaseModule,

    JwtModule.register({
      secret: 'yasdmfy', // Replace with your own secret key
      signOptions: { expiresIn: '1h' }, // Configure token expiration
    }),
  ],
  controllers: [PayPalController],
  providers: [paymentService, AuthService, decodeTokenMiddleware],
})
export class PayPalModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(decodeTokenMiddleware)
      .forRoutes('api/payments/*')
  }


}
