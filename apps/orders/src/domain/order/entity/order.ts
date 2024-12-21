import { Entity } from '../../../../../@shared/entity/entity';
import { Customer } from '../../customer/entity/customer';
import { ProductOrder } from '../../product-order/entity/product-order';
import { Address } from '../object-value/address';

export enum OrderStatus {
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  RETURNED = 'returned',
}

export interface OrderProps {
  id: string;
  customer: Customer;
  billingDate: Date;
  deliveryDate: Date;
  status: OrderStatus;
  billingAddress: Address;
  productOrders: ProductOrder[];
}

export class Order extends Entity {
  isValid(): boolean {
    throw new Error('Method not implemented.');
  }
  toJSON(): object {
    throw new Error('Method not implemented.');
  }
}
