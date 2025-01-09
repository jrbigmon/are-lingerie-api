import { RepositoryInterface } from '../../../../../@shared/repository/repository.interface';
import { ProductOrder } from '../../../domain/product-order/entity/product-order';
import { ProductOrderModel } from '../model/product-order.model';

export interface ProductOrderRepositoryInterface
  extends RepositoryInterface<ProductOrderModel, ProductOrder> {}
