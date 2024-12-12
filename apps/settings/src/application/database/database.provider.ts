import { DataSource } from 'typeorm';
import { BagModel } from '../bag/model/bag.model';
import { DATABASE_PROVIDE_NAME_PG } from '../../../utils/constants';
import { parse } from 'url';
import { ProductModel } from '../product/model/product.model';

export const entities = [BagModel, ProductModel];

const parseDatabaseUrl = (dbUrl: string) => {
  const parsedUrl = parse(dbUrl, false);
  const [username, password] = parsedUrl.auth ? parsedUrl.auth.split(':') : [];
  const database = parsedUrl.pathname ? parsedUrl.pathname.split('/')[1] : '';

  return {
    host: parsedUrl.hostname,
    port: parsedUrl.port ? parseInt(parsedUrl.port) : 5432,
    username,
    password,
    database,
  };
};

const productionProvider = [
  {
    provide: DATABASE_PROVIDE_NAME_PG,
    useFactory: async () => {
      const dbConfig = parseDatabaseUrl(process.env.SETTINGS_DATABASE_URL);

      const dataSource = new DataSource({
        type: 'postgres',
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.database,
        entities,
        synchronize: process.env.NODE_ENV === 'test',
        logging: process.env.NODE_ENV !== 'production',
      });

      return dataSource.initialize();
    },
  },
];

const testProvider = [
  {
    provide: DATABASE_PROVIDE_NAME_PG,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: ':memory:',
        entities,
        synchronize: true,
        logging: false,
      });

      return dataSource.initialize();
    },
  },
];

const getDatabaseProvider = () => {
  if (process.env.NODE_ENV === 'test') return testProvider;

  return productionProvider;
};

export const databaseProviders = getDatabaseProvider();
