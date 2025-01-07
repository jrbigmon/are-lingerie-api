import { IsNotEmpty } from 'class-validator';
import { ProductProps } from './product';

export class ProductValidation {
  @IsNotEmpty({ message: 'Product id is required' })
  id: string;

  constructor({ id }: ProductProps) {
    this.id = id;
  }
}
