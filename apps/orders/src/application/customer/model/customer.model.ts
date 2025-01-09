import { Column, Entity } from 'typeorm';
import { Model } from '../../../../../@shared/model/model';

@Entity('customer')
export class CustomerModel extends Model {
  @Column({ name: 'full_name', nullable: false })
  fullName: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'phone', nullable: true })
  phone: string;
}
