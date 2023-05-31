import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'free',
  password: 'free',
  database: 'free',
  autoLoadModels: true,
  synchronize: true,
};


