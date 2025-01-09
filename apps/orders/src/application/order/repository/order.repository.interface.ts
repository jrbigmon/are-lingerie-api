import { RepositoryInterface } from '../../../../../@shared/repository/repository.interface';
import { Order } from '../../../domain/order/entity/order';
import { OrderModel } from '../model/order.model';

export interface OrderRepositoryInterface
  extends RepositoryInterface<OrderModel, Order> {}
