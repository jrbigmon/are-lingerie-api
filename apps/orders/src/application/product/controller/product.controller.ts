import { Controller, Get, Inject, Param } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DATABASE_PROVIDE_NAME_PG } from '../../../../utils/constants';
import { ProductService } from '../service/product.service';
import { FindProductOutput } from '../dto/find-product.dto';

@Controller('v1/products')
export class ProductControllerV1 {
  constructor(
    private readonly productService: ProductService,
    @Inject(DATABASE_PROVIDE_NAME_PG)
    private readonly dataSource: DataSource,
  ) {}

  @Get(':id')
  public async getById(
    @Param('id') id: string,
  ): Promise<FindProductOutput | null> {
    return await this.dataSource.transaction(async (entityManager) => {
      return await this.productService.get(id, entityManager);
    });
  }
}
