import { Inject } from '@nestjs/common';
import { Product } from '../../../domain/product/entity/product';
import { ProductModel } from '../model/product.model';
import { ProductRepositoryInterface } from './product.repository.interface';
import { Barcode } from '../../../domain/product/object-value/barcode';
import {
  Lingerie,
  LingerieSize,
} from '../../../domain/product/entity/lingerie/lingerie';
import { Generic } from '../../../domain/product/entity/generic/generic';
import { Repository } from 'typeorm';

export class ProductRepository implements ProductRepositoryInterface {
  constructor(
    @Inject('PRODUCT_MODEL')
    private readonly productModel: Repository<ProductModel>,
  ) {}

  private instantiateEntity(model: ProductModel): Product {
    if (model.type === Lingerie.name) {
      return new Lingerie({
        id: model.id,
        name: model.name,
        description: model.description,
        barcode: new Barcode(model.barcode),
        size: model.size as LingerieSize,
      });
    }

    return new Generic({
      id: model.id,
      name: model.name,
      description: model.description,
      barcode: new Barcode(model.barcode),
    });
  }

  async findById(id: string): Promise<Product | null> {
    if (!id) return null;

    const productModel = await this.productModel.findOneBy({
      id,
    });

    if (!productModel) return null;

    return this.instantiateEntity(productModel);
  }

  async findAll(): Promise<Array<Product>> {
    const productModels = await this.productModel.find({});

    return productModels.map((model) => this.instantiateEntity(model));
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
}
