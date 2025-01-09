import { EntityManager, Repository } from 'typeorm';
import { BaseRepository } from '../../../../../@shared/repository/base.repository';
import { ProductOrderModel } from '../model/product-order.model';
import { ProductOrderRepositoryInterface } from './product-order.repository.interface';
import { Inject } from '@nestjs/common';
import { ProductOrder } from '../../../domain/product-order/entity/product-order';

export class ProductOrderRepository
  extends BaseRepository<ProductOrderModel>
  implements ProductOrderRepositoryInterface
{
  constructor(
    @Inject('PRODUCT_ORDER_MODEL')
    protected readonly productOrderModel: Repository<ProductOrderModel>,
  ) {
    super(ProductOrderModel, productOrderModel);
  }

  public async save(
    entity: ProductOrder,
    entityManager?: EntityManager,
  ): Promise<void> {
    return;
  }
}
