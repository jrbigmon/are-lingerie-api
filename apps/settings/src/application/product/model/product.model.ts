import { Column, Entity } from 'typeorm';
import { Model } from '../../../../../@shared/model/model';

@Entity('product')
export class ProductModel extends Model {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  barcode: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: true })
  size?: string;
}
