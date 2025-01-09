import { IsNotEmpty } from 'class-validator';
import { Product, ProductProps } from './product';
import { Barcode } from '../object-value/barcode';

export class ProductValidator {
  @IsNotEmpty({ message: 'Product id is required' })
  id: string;

  @IsNotEmpty({ message: 'Product name is required' })
  name: string;

  @IsNotEmpty({ message: 'Product description is required' })
  description: string;

  @IsNotEmpty({ message: 'Product barcode is required' })
  barcode: Barcode;

  @IsNotEmpty({ message: 'Product type is required' })
  type: string;

  constructor(product: Product) {
    this.id = product.getId();
    this.name = product.getName();
    this.description = product.getDescription();
    this.barcode = product.getBarcode();
    this.type = product.getType();
  }
}
