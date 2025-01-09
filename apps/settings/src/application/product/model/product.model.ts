import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Model } from '../../../../../@shared/model/model';
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

  @ManyToOne(() => BagModel)
  bag: BagModel;

  @Column({ name: 'bag_id', nullable: true })
  @RelationId((productModel: ProductModel) => productModel.bag)
  bagId: string;
}
