import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { Model } from '../../../../../@shared/model/model';
import { ProductModel } from '../../product/model/product.model';

@Entity({ name: 'bag' })
export class BagModel extends Model {
  @Column({ nullable: false })
  description: string;

  @Column({ name: 'date_of_receipt', nullable: false })
  dateOfReceipt: Date;

  @Column({ name: 'delivery_date', nullable: false })
  deliveryDate: Date;

  @OneToMany(() => ProductModel, (product) => product.bag)
  products: ProductModel[];
}
