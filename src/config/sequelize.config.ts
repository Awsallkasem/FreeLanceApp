import { SequelizeModuleOptions } from '@nestjs/sequelize';

const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'free',
  password: 'free',
  database: 'free',
  autoLoadModels: true,
  synchronize: true,
};

export default sequelizeConfig;
