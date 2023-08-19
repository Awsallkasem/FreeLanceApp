import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/database/models/user.model';
import { Published } from './models/Publish.model';
import { Rating } from './models/rating.model';
import { FreeLance } from './models/freeLance.model';
import { Service } from './models/service.model';
import { Payment } from './models/payment.model';
import { Licens } from './models/licnse.model';

import { Payout } from './models/payout.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'free',
        password: 'free',
        database: 'free',
        logging:false
      });

      sequelize.addModels([User, Published,Rating,Service,FreeLance,Payment,Licens,Payout]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
