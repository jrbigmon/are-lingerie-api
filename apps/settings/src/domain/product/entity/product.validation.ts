import { IsNotEmpty } from 'class-validator';
import { ProductProps } from './product';

export class ProductValidator {
  @IsNotEmpty({ message: 'Product id is required' })
  id: string;

  @IsNotEmpty({ message: 'Product name is required' })
  name: string;

  @IsNotEmpty({ message: 'Product description is required' })
  description: string;

  @IsNotEmpty({ message: 'Product barcode is required' })
  barcode: string;

  @IsNotEmpty({ message: 'Product type is required' })
  type: string;

  constructor({ id, name, description, barcode, type }: ProductProps) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.barcode = barcode;
    this.type = type;
  }
}
