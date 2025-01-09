import { EntityManager } from 'typeorm';
import { FindProductOutput } from '../dto/find-product.dto';

export interface ProductServiceInterface {
  get(id: string, entityManager?: EntityManager): Promise<FindProductOutput>;
}
