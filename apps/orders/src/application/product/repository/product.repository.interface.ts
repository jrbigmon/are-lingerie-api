import { EntityManager } from 'typeorm';
import { RepositoryInterface } from '../../../../../@shared/repository/repository.interface';
import { Product } from '../../../domain/product/entity/product';
import { ProductModel } from '../model/product.model';

export interface ProductRepositoryInterface
  extends RepositoryInterface<ProductModel, Product> {
  get(id: string, entityManager?: EntityManager): Promise<Product | null>;
}
