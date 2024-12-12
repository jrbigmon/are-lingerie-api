import { Inject, Injectable } from '@nestjs/common';
import { ProductServiceInterface } from './product.service.interface';
import { ProductRepositoryInterface } from '../repository/product.repository.interface';
import {
  CreateProductInput,
  CreateProductOutput,
} from '../dto/create-product.dto';
import { DeleteProductOutput } from '../dto/delete-product.dto';
import { GetProductOutput } from '../dto/get-product.dto';
import { ListProductInput, ListProductOutput } from '../dto/list-product.dto';
import {
  UpdateProductInput,
  UpdateProductOutput,
} from '../dto/update-product.dto';
import { createProductService } from '../../../domain/product/service/create-product.service';
import { updateProductService } from '../../../domain/product/service/update-product.service';

@Injectable()
export class ProductService implements ProductServiceInterface {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductRepositoryInterface,
  ) {}

  async create(input: CreateProductInput): Promise<CreateProductOutput> {
    const { createOne } = createProductService();

    const product = createOne(input);

    await this.repository.save(product);

    const { id, name, description, barcode, type, size } = product.toJSON();

    return {
      id,
      name,
      description,
      barcode: barcode.getCode(),
      type,
      size,
    };
  }

  async update(
    id: string,
    input: UpdateProductInput,
  ): Promise<UpdateProductOutput> {
    if (!id) return null;

    const { updateOne } = updateProductService();

    const product = await this.repository.findById(id);

    updateOne(product, input);

    await this.repository.save(product);

    const { name, description, barcode, type, size } = product.toJSON();

    return {
      id,
      name,
      description,
      barcode: barcode.getCode(),
      type,
      size,
    };
  }

  delete(id: string): Promise<DeleteProductOutput> {
    throw new Error('Method not implemented.');
  }

  list(input: ListProductInput): Promise<ListProductOutput> {
    throw new Error('Method not implemented.');
  }

  get(id: string): Promise<GetProductOutput | null> {
    throw new Error('Method not implemented.');
  }
}
