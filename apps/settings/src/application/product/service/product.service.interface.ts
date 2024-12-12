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
  create(input: CreateProductInput): Promise<CreateProductOutput>;
  update(id: string, input: UpdateProductInput): Promise<UpdateProductOutput>;
  delete(id: string): Promise<DeleteProductOutput>;
  list(input: ListProductInput): Promise<ListProductOutput>;
  get(id: string): Promise<GetProductOutput | null>;
}
