import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../../database/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FreeLance } from 'src/database/models/freeLance.model';
import { Rating } from 'src/database/models/rating.model';
import { Posts } from 'src/database/models/post.model';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
