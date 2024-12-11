import { DataSource } from 'typeorm';
import { BagModel } from '../bag/model/bag.model';
import { DATABASE_PROVIDE_NAME_PG } from '../../../utils/constants';
import { parse } from 'url';

export const entities = [BagModel];

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

export const databaseProviders = [
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
        logging: process.env.NODE_ENV !== 'production', // Log em ambientes não-produtivos
      });

      return dataSource.initialize();
    },
  },
];
