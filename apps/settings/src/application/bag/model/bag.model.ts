import { Column, Entity } from 'typeorm';
import { Model } from '../../../../../@shared/model/model';

@Entity({ name: 'bag' })
export class BagModel extends Model {
  @Column({ nullable: false })
  description: string;

  @Column({ name: 'date_of_receipt', nullable: false })
  dateOfReceipt: Date;

  @Column({ name: 'delivery_date', nullable: false })
  deliveryDate: Date;
}
