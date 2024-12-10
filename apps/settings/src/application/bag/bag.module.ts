import { Module, Provider } from '@nestjs/common';
import { BagService } from './service/bag.service';
import { DatabaseModule } from '../database/database.module';
import { BagRepository } from './repository/bag.repository';
import { DataSource } from 'typeorm';
import { BagModel } from './model/bag.model';
import { DATABASE_PROVIDE_NAME_PG } from '../../../utils/constants';
import { BagControllerV1 } from './controller/bag.controller';

const services: Provider[] = [
  BagService,
  BagRepository,
  {
    provide: 'BagRepository',
    useValue: BagRepository,
  },
  {
    provide: 'BAG_MODEL',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(BagModel),
    inject: [DATABASE_PROVIDE_NAME_PG],
  },
];

@Module({
  imports: [DatabaseModule],
  controllers: [BagControllerV1],
  providers: services,
  exports: services,
})
export class BagModule {}
