import { DataSource, EntitySchema, MixedList } from 'typeorm';
import { parse } from 'url';

export type EntityProvide = MixedList<string | Function | EntitySchema<any>>;

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

const productionProvider = (provide: string, entities: EntityProvide) => [
  {
    provide,
    useFactory: async () => {
      const dbConfig = parseDatabaseUrl(process.env.ORDER_DATABASE_URL);

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

const testProvider = (provide: string, entities: EntityProvide) => [
  {
    provide,
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

export const getDatabaseProvider = (
  provide: string,
  entities: EntityProvide,
) => {
  if (process.env.NODE_ENV === 'test') return testProvider(provide, entities);

  return productionProvider(provide, entities);
};
