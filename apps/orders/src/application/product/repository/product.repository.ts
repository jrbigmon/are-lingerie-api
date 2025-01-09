import { EntityManager, Repository } from 'typeorm';
import { BaseRepository } from '../../../../../@shared/repository/base.repository';
import { ProductModel } from '../model/product.model';
import { ProductRepositoryInterface } from './product.repository.interface';
import { Inject } from '@nestjs/common';
import { Product } from '../../../domain/product/entity/product';

export class ProductRepository
  extends BaseRepository<ProductModel>
  implements ProductRepositoryInterface
{
  constructor(
    @Inject('PRODUCT_MODEL')
    protected readonly productModel: Repository<ProductModel>,
  ) {
    super(ProductModel, productModel);
  }

  public async save(
    entity: Product,
    entityManager?: EntityManager,
  ): Promise<void> {
    return;
  }
}
