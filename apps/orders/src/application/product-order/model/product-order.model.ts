import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Model } from '../../../../../@shared/model/model';
import { ProductModel } from '../../product/model/product.model';

@Entity('product_order')
export class ProductOrderModel extends Model {
  @ManyToOne(() => ProductModel)
  product: ProductModel;

  @Column({ name: 'product_id', nullable: false })
  @RelationId(
    (productOrderModel: ProductOrderModel) => productOrderModel.product,
  )
  productId: string;
}
