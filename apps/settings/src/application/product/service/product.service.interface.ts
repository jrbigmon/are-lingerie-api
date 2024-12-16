import { EntityManager } from 'typeorm';
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

export interface ProductServiceInterface {
  create(
    input: CreateProductInput,
    entityManager?: EntityManager,
  ): Promise<CreateProductOutput>;
  update(
    id: string,
    input: UpdateProductInput,
    entityManager?: EntityManager,
  ): Promise<UpdateProductOutput>;
  delete(
    id: string,
    entityManager?: EntityManager,
  ): Promise<DeleteProductOutput>;
  list(
    input: ListProductInput,
    entityManager?: EntityManager,
  ): Promise<ListProductOutput>;
  get(
    id: string,
    entityManager?: EntityManager,
  ): Promise<GetProductOutput | null>;
}
