import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import {
  CreateProductInput,
  CreateProductOutput,
} from '../dto/create-product.dto';
import {
  UpdateProductInput,
  UpdateProductOutput,
} from '../dto/update-product.dto';
import { DataSource } from 'typeorm';
import { DATABASE_PROVIDE_NAME_PG } from '../../../../utils/constants';

@Controller('v1/products')
export class ProductControllerV1 {
  constructor(
    private readonly productService: ProductService,
    @Inject(DATABASE_PROVIDE_NAME_PG)
    private readonly dataSource: DataSource,
  ) {}

  @Post()
  async create(input: CreateProductInput): Promise<CreateProductOutput> {
    return await this.dataSource.transaction(async (entityManager) => {
      return await this.productService.create(input, entityManager);
    });
  }

  @Put()
  async update(
    id: string,
    input: UpdateProductInput,
  ): Promise<UpdateProductOutput> {
    return await this.dataSource.transaction(async (entityManager) => {
      return await this.productService.update(id, input, entityManager);
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.dataSource.transaction(async (entityManager) => {
      await this.productService.delete(id, entityManager);
    });
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<CreateProductOutput | null> {
    return await this.dataSource.transaction(async (entityManager) => {
      return await this.productService.get(id, entityManager);
    });
  }

  @Get()
  async list(): Promise<Array<CreateProductOutput>> {
    return await this.dataSource.transaction(async (entityManager) => {
      return await this.productService.list({}, entityManager);
    });
  }
}
