import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getDatabaseProvider } from '../../../../@shared/database/database.provider';
import { DATABASE_PROVIDE_NAME_PG } from '../../../utils/constants';

const databaseProviders = getDatabaseProvider(DATABASE_PROVIDE_NAME_PG, []);

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
