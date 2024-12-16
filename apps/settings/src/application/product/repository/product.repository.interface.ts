import { EntityManager } from 'typeorm';
import { RepositoryInterface } from '../../../../../@shared/repository/repository.interface';
// import { LingerieSize } from '../../../domain/product/entity/lingerie/lingerie';
import { Product } from '../../../domain/product/entity/product';

export interface FindByIdOptions {
  includeBag?: boolean;
}

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {
  findById(
    id: string,
    options?: FindByIdOptions,
    entityManager?: EntityManager,
  ): Promise<Product | null>;
  findAll(entityManager?: EntityManager): Promise<Array<Product>>;
  delete(product: Product, entityManager?: EntityManager): Promise<void>;
  // findByType(type: string): Promise<Array<Product>>;
  // findByTypeAndSize(type: string, size: LingerieSize): Promise<Array<Product>>;
  // findByTypeAndSizeAndBarcode(
  //   type: string,
  //   size: LingerieSize,
  //   barcode: string,
  // ): Promise<Product | null>;
}
