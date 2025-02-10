import { EntityManager, Repository } from 'typeorm';
import { BaseRepository } from '../../../../../@shared/repository/base.repository';
import { ProductModel } from '../model/product.model';
import { ProductRepositoryInterface } from './product.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../../../domain/product/entity/product';
import { instantiateEntities } from '../../../../utils/instantiate-entites';

const { initProduct } = instantiateEntities();

@Injectable()
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
    const model = this.getSQLRepository(entityManager);

    const {
      id,
      name,
      description,
      barcode,
      purchasePrice,
      sellingPrice,
      originalProductId,
    } = entity.toJSON();

    await model.save({
      id,
      name,
      description,
      barcode,
      purchasePrice,
      sellingPrice,
      originalProductId,
    });
  }

  public async get(
    id: string,
    entityManager?: EntityManager,
  ): Promise<Product | null> {
    if (!id) return null;

    const model = this.getSQLRepository(entityManager);

    const productModel = await model.findOneBy({
      id,
    });

    if (!productModel) return null;

    return initProduct(productModel);
  }
}
