import { Module, Provider } from '@nestjs/common';
import { ProductRepository } from './repository/product.repository';
import { DATABASE_PROVIDE_NAME_PG } from '../../../utils/constants';
import { DataSource } from 'typeorm';
import { ProductModel } from './model/product.model';
import { DatabaseModule } from '../database/database.module';
import { ProductService } from './service/product.service';

const services: Provider[] = [
  ProductService,
  ProductRepository,
  {
    provide: 'ProductRepository',
    useClass: ProductRepository,
  },
  {
    provide: 'PRODUCT_MODEL',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductModel),
    inject: [DATABASE_PROVIDE_NAME_PG],
  },
];

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: services,
  exports: services,
})
export class ProductModule {}
