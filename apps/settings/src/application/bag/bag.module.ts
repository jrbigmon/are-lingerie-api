import { Module, Provider } from '@nestjs/common';
import { BagService } from './service/bag.service';
import { DatabaseModule } from '../database/database.module';
import { Connection } from 'mongoose';
import { BagSchema } from './model/bag.schema';
import { BagRepository } from './repository/bag.repository';

const services: Provider[] = [
  BagService,
  BagRepository,
  {
    provide: 'BAG_MODEL',
    useFactory: (connection: Connection) => connection.model('Bag', BagSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'BagRepository',
    useValue: BagRepository,
  },
];

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: services,
  exports: services,
})
export class BagModule {}
