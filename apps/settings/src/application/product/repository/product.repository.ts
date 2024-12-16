import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../../../domain/product/entity/product';
import { ProductModel } from '../model/product.model';
import {
  FindByIdOptions,
  ProductRepositoryInterface,
} from './product.repository.interface';
import { EntityManager, Repository } from 'typeorm';
import { instantiateEntities } from '../../../../utils/instantiate-entites';
import { BaseRepository } from '../../../../../@shared/repository/base.repository';

const { initProduct } = instantiateEntities();

@Injectable()
export class ProductRepository
  extends BaseRepository
  implements ProductRepositoryInterface
{
  constructor(
    @Inject('PRODUCT_MODEL')
    protected readonly productModel: Repository<ProductModel>,
  ) {
    super(ProductModel, productModel);
  }

  async findById(
    id: string,
    { includeBag = false }: FindByIdOptions = {},
    entityManager?: EntityManager,
  ): Promise<Product | null> {
    const model = this.getSQLRepository(entityManager);

    if (!id) return null;

    const productModel = await model.findOne({
      where: { id },
      relations: {
        bag: includeBag,
      },
    });

    if (!productModel) return null;

    return initProduct(productModel);
  }

  async findAll(entityManager?: EntityManager): Promise<Array<Product>> {
    const model = this.getSQLRepository(entityManager);

    const productModels = await model.find({});

    return productModels.map((model) => initProduct(model));
  }

  async save(entity: Product, entityManager?: EntityManager): Promise<void> {
    const model = this.getSQLRepository(entityManager);

    const { id, name, description, barcode, type, size } = entity.toJSON();

    await model.save({
      id,
      name,
      description,
      barcode: barcode.getCode(),
      type,
      size: size ?? null,
    } as ProductModel);
  }

  async delete(product: Product, entityManager?: EntityManager): Promise<void> {
    const model = this.getSQLRepository(entityManager);

    if (!product) return;

    await model.softDelete({ id: product.getId() });
  }
}
