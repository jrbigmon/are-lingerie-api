import { Entity } from '../../../../../@shared/entity/entity';
import { validateSyncData } from '../../../../../@shared/validation/validate-sync-data';
import { Customer } from '../../customer/entity/customer';
import { ProductOrder } from '../../product-order/entity/product-order';
import { Address } from '../object-value/address';
import { OrderValidation } from './order.validation';

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
  private customer: Customer;
  private billingDate: Date;
  private deliveryDate: Date;
  private status: OrderStatus;
  private billingAddress: Address;
  private productOrders: ProductOrder[];

  constructor({
    id,
    customer,
    billingDate,
    billingAddress,
    status,
    productOrders,
    deliveryDate,
  }: OrderProps) {
    super(id);
    this.customer = customer;
    this.billingDate = billingDate;
    this.deliveryDate = deliveryDate;
    this.status = status;
    this.billingAddress = billingAddress;
    this.productOrders = productOrders;
    this.isValid();
  }

  isValid(): boolean {
    const errors = validateSyncData(new OrderValidation(this), Order.name);

    if (errors.length) {
      throw errors;
    }

    return true;
  }

  toJSON() {
    return {
      id: this.id,
      customer: this.customer.toJSON(),
      billingDate: this.billingDate,
      deliveryDate: this.deliveryDate,
      status: this.status,
      billingAddress: this.billingAddress,
      productOrders: this.productOrders.map((productOrder) =>
        productOrder.toJSON(),
      ),
    };
  }

  public getCustomer(): Customer {
    return this.customer;
  }

  public setCustomer(customer: Customer): void {
    this.customer = customer;
  }

  public getBillingDate(): Date {
    return this.billingDate;
  }

  public setBillingDate(billingDate: Date): void {
    this.billingDate = billingDate;
  }

  public getDeliveryDate(): Date {
    return this.deliveryDate;
  }

  public setDeliveryDate(deliveryDate: Date): void {
    this.deliveryDate = deliveryDate;
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  public setStatus(status: OrderStatus): void {
    this.status = status;
  }

  public getBillingAddress(): Address {
    return this.billingAddress;
  }

  public setBillingAddress(billingAddress: Address): void {
    this.billingAddress = billingAddress;
  }

  public getProductOrders(): ProductOrder[] {
    return this.productOrders;
  }

  public setProductOrders(productOrders: ProductOrder[]): void {
    this.productOrders = productOrders;
  }
}
