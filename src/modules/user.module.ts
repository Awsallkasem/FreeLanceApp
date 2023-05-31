import { MiddlewareConsumer, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../database/models/user.model";
import { AuthModule } from "./auth.module";
import { AdminModule } from "./admin.module";
import { Published } from "src/database/models/Publish.model";
import { UserController } from "src/controllers/user.controller";
import { UserService } from "src/services/user.service";
import { decodeTokenMiddleware } from "src/middlewares/authrization/decodeToken.middleware";
import { UserMiddleware } from "src/middlewares/authrization/user.middleware";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "src/controllers/auth.controller";
import { AuthService } from "src/services/auth.service";
import { FreeLance } from "src/database/models/freeLance.model";
import { DatabaseModule } from "src/database/database.module";


export const UserProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
];
@Module({
  imports: [
    DatabaseModule,

    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    AdminModule,
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, ...UserProviders]

})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(decodeTokenMiddleware)
      .forRoutes('api/user')
      .apply(UserMiddleware)
      .forRoutes('api/user/*');
  }
}


