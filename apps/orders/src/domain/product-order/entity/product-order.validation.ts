import { IsNotEmpty, Min, ValidateIf } from 'class-validator';
import { Product } from '../../product/entity/product';
import { ProductOrder } from './product-order';

export class ProductOrderValidation {
  @IsNotEmpty({ message: 'Product order id is required' })
  id: string;

  @IsNotEmpty({ message: 'Product in product order is required' })
  public product: Product;

  @ValidateIf((_, value) => value !== undefined && value !== null)
  @Min(1, { message: 'Product order quantity must be greater than 1' })
  public quantity?: number;

  @IsNotEmpty({ message: 'Product order id is required' })
  public orderId: string;

  constructor(productOrder: ProductOrder) {
    this.id = productOrder.getId();
    this.product = productOrder.getProduct();
    this.quantity = productOrder.getQuantity();
    this.orderId = productOrder.getOrderId();
  }
}
