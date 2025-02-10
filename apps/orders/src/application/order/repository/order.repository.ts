import { EntityManager, Repository } from 'typeorm';
import { BaseRepository } from '../../../../../@shared/repository/base.repository';
import { OrderRepositoryInterface } from './order.repository.interface';
import { OrderModel } from '../model/order.model';
import { Order } from '../../../domain/order/entity/order';
import { Inject } from '@nestjs/common';
import { CustomerModel } from '../../customer/model/customer.model';
import { ProductOrderModel } from '../../product-order/model/product-order.model';
import { ProductModel } from '../../product/model/product.model';

export class OrderRepository
  extends BaseRepository<OrderModel>
  implements OrderRepositoryInterface
{
  constructor(
    @Inject('ORDER_MODEL')
    protected readonly orderModel: Repository<OrderModel>,
  ) {
    super(OrderModel, orderModel);
  }

  public async save(
    entity: Order,
    entityManager?: EntityManager,
  ): Promise<void> {
    const model = this.getSQLRepository(entityManager);

    const { id, status, customer, deliveryDate, billingAddress, billingDate } =
      entity.toJSON();

    await model.save({
      id,
      status,
      customerId: customer.id,
      deliveryDate,
      billingDate,
      city: billingAddress.getCity(),
      country: billingAddress.getCountry(),
      state: billingAddress.getState(),
      zipCode: billingAddress.getZipCode(),
      street: billingAddress.getStreet(),
    } as OrderModel);
  }
}
