import { IsNotEmpty } from 'class-validator';
import { Product, ProductProps } from './product';

export class ProductValidation {
  @IsNotEmpty({ message: 'Product id is required' })
  id: string;

  constructor(product: Product) {
    this.id = product.getId();
  }
}
