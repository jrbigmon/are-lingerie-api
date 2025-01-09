import { Column, ManyToOne, RelationId } from 'typeorm';
import { Model } from '../../../../../@shared/model/model';
import { OrderStatus } from '../../../domain/order/entity/order';
import { CustomerModel } from '../../customer/model/customer.model';

export class OrderModel extends Model {
  @Column({ name: 'billing_date', nullable: false })
  billingDate: Date;

  @Column({ name: 'delivery_date', nullable: false })
  deliveryDate: Date;

  @Column({ nullable: false, type: 'enum' })
  status: OrderStatus;

  @ManyToOne(() => CustomerModel)
  customer: CustomerModel;

  @Column({ name: 'customer_id', nullable: false })
  @RelationId((orderModel: OrderModel) => orderModel.customer)
  customerId: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column({ nullable: true })
  country: string;
}
