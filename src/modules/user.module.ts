import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../database/models/user.model";
import { AuthModule } from "./auth.module";
import { UserService } from "../services/user.service";
import sequelizeConfig from "src/config/sequelize.config";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from "./admin.module";
import { AdminService } from "src/services/admin.service";


export const USerProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
];
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'yasdmfy', // Replace with your own secret key
      signOptions: { expiresIn: '1h' }, // Configure token expiration
    }),
    AuthModule,
    AdminModule,
  ],
  
  // providers: [UserService,AdminService],
})
export class UserModule {}


