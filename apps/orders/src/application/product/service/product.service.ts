import { Inject, Injectable } from '@nestjs/common';
import { ProductRepositoryInterface } from '../repository/product.repository.interface';
import { ProductServiceInterface } from './product.service.interface';
import { EntityManager } from 'typeorm';

import { FindProductOutput } from '../dto/find-product.dto';

@Injectable()
export class ProductService implements ProductServiceInterface {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductRepositoryInterface,
  ) {}

  async get(
    id: string,
    entityManager?: EntityManager,
  ): Promise<FindProductOutput> {
    if (!id) return null;

    const product = await this.repository.get(id, entityManager);

    const {
      name,
      description,
      barcode,
      sellingPrice,
      purchasePrice,
      originalProductId,
    } = product.toJSON();

    return {
      id,
      name,
      description,
      barcode,
      sellingPrice,
      purchasePrice,
      percentOfDiscount: product.getPercentOfDiscount(),
      originalProductId,
    };
  }
}
