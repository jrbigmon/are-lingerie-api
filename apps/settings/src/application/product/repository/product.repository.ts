import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../../../domain/product/entity/product';
import { ProductModel } from '../model/product.model';
import {
  FindByIdOptions,
  ProductRepositoryInterface,
} from './product.repository.interface';
import { Repository } from 'typeorm';
import { instantiateEntities } from '../../../../utils/instantiate-entites';

const { initProduct } = instantiateEntities();

@Injectable()
export class ProductRepository implements ProductRepositoryInterface {
  constructor(
    @Inject('PRODUCT_MODEL')
    private readonly productModel: Repository<ProductModel>,
  ) {}

  async findById(
    id: string,
    { includeBag = false }: FindByIdOptions = {},
  ): Promise<Product | null> {
    if (!id) return null;

    const productModel = await this.productModel.findOne({
      where: { id },
      relations: {
        bag: includeBag,
      },
    });

    if (!productModel) return null;

    return initProduct(productModel);
  }

  async findAll(): Promise<Array<Product>> {
    const productModels = await this.productModel.find({});

    return productModels.map((model) => initProduct(model));
  }

  async save(entity: Product): Promise<void> {
    const { id, name, description, barcode, type, size } = entity.toJSON();

    await this.productModel.save({
      id,
      name,
      description,
      barcode: barcode.getCode(),
      type,
      size: size ?? null,
    } as ProductModel);
  }

  async delete(product: Product): Promise<void> {
    if (!product) return;

    await this.productModel.softDelete({ id: product.getId() });
  }
}
