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

  @Column({ name: 'purchase_price', nullable: false })
  purchasePrice: number;

  @Column({ name: 'selling_price', nullable: false })
  sellingPrice: number;
}
