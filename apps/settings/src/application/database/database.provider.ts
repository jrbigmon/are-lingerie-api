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
        host: process.env.SETTINGS_DATABASE_URL,
        port: Number(process.env.SETTINGS_DB_PORT),
        username: process.env.SETTINGS_DB_USER,
        password: process.env.SETTINGS_DB_PASSWORD,
        database: process.env.SETTINGS_DB_NAME,
        entities,
        synchronize: process.env.NODE_ENV === 'test',
      });

      return dataSource.initialize();
    },
  },
];
