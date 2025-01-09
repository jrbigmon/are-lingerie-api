import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import { Customer } from '../../customer/entity/customer';
import { ProductOrder } from '../../product-order/entity/product-order';
import { Address } from '../object-value/address';
import { Order, OrderProps, OrderStatus } from './order';

export class OrderValidation {
  @IsNotEmpty({ message: 'Order id is required' })
  id: string;

  @IsNotEmpty({ message: 'Order customer is required' })
  customer: Customer;

  @IsNotEmpty({ message: 'Order billing date is required' })
  billingDate: Date;

  @IsNotEmpty({ message: 'Order delivery date is required' })
  deliveryDate: Date;

  @IsNotEmpty({ message: 'Order status is required' })
  status: OrderStatus;

  @IsNotEmpty({ message: 'Order billing address is required' })
  billingAddress: Address;

  @ArrayNotEmpty({ message: 'Product orders must be greater than zero' })
  productOrders: ProductOrder[];

  constructor(order: Order) {
    this.id = order.getId();
    this.customer = order.getCustomer();
    this.billingDate = order.getBillingDate();
    this.deliveryDate = order.getDeliveryDate();
    this.status = order.getStatus();
    this.billingAddress = order.getBillingAddress();
    this.productOrders = order.getProductOrders();
  }
}
