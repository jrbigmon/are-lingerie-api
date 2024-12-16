import { EntityManager } from 'typeorm';
import { Product } from '../../../domain/product/entity/product';
import {
  CreateEmptyBagInput,
  CreateEmptyBagOutput,
} from '../dto/create-empty-bag.dto';
import {
  CreateLoadBagInput,
  CreateLoadBagOutput,
} from '../dto/create-load-bag.dto';
import { GetBagOutput } from '../dto/get-bag.dto';
import { ListBagInput, ListBagOutput } from '../dto/list-bag.dto';

export interface BagServiceInterface {
  createEmptyBag(
    input: CreateEmptyBagInput,
    entityManager?: EntityManager,
  ): Promise<CreateEmptyBagOutput>;
  createLoadedBag(
    input: CreateLoadBagInput,
    entityManager?: EntityManager,
  ): Promise<CreateLoadBagOutput>;
  list(
    input: ListBagInput,
    entityManager?: EntityManager,
  ): Promise<ListBagOutput>;
  get(id: string, entityManager?: EntityManager): Promise<GetBagOutput | null>;
  addProduct(
    id: string,
    productId: string,
    entityManager?: EntityManager,
  ): Promise<boolean>;
}
