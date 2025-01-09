import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProductService } from './service/product.service';
import { ProductRepository } from './repository/product.repository';
import { DataSource } from 'typeorm';
import { DATABASE_PROVIDE_NAME_PG } from '../../../utils/constants';
import { ProductModel } from './model/product.model';

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
  providers: services,
  exports: services,
})
export class ProductModule {}
