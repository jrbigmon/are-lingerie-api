import { DataSource } from 'typeorm';
import { BagModel } from '../bag/model/bag.model';
import { DATABASE_PROVIDE_NAME_PG } from '../../../utils/constants';

export const entities = [BagModel];

export const databaseProviders = [
  {
    provide: DATABASE_PROVIDE_NAME_PG,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST_PG,
        port: Number(process.env.DB_PORT_PG),
        username: process.env.DB_USERNAME_PG,
        password: process.env.DB_PASSWORD_PG,
        database: process.env.DB_NAME_PG,
        entities,
        synchronize: process.env.NODE_ENV === 'test',
      });

      return dataSource.initialize();
    },
  },
];
