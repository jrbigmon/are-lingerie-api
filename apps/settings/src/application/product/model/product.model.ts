import { Column, Entity, OneToMany } from 'typeorm';
import { Model } from '../../../../../@shared/model/model';
import { Bag } from '../../../domain/bag/entity/bag';
import { BagModel } from '../../bag/model/bag.model';

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

  @OneToMany(() => BagModel, (bag) => bag.products)
  bag: BagModel;
}
