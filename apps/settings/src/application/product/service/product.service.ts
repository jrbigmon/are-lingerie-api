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

@Injectable()
export class ProductService implements ProductServiceInterface {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductRepositoryInterface,
  ) {}

  create(input: CreateProductInput): Promise<CreateProductOutput> {
    throw new Error('Method not implemented.');
  }
  update(id: string, input: UpdateProductInput): Promise<UpdateProductOutput> {
    throw new Error('Method not implemented.');
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
