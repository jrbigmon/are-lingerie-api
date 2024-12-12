import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import {
  CreateProductInput,
  CreateProductOutput,
} from '../dto/create-product.dto';
import {
  UpdateProductInput,
  UpdateProductOutput,
} from '../dto/update-product.dto';

@Controller('v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(input: CreateProductInput): Promise<CreateProductOutput> {
    return await this.productService.create(input);
  }

  @Put()
  async update(
    id: string,
    input: UpdateProductInput,
  ): Promise<UpdateProductOutput> {
    return await this.productService.update(id, input);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.productService.delete(id);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<CreateProductOutput | null> {
    return await this.productService.get(id);
  }

  @Get()
  async list(): Promise<Array<CreateProductOutput>> {
    return await this.productService.list({});
  }
}
