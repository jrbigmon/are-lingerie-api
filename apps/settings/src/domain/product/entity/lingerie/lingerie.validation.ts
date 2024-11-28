import { IsNotEmpty } from 'class-validator';
import { LingerieProps, LingerieSize } from './lingerie';

export class LingerieValidator {
  @IsNotEmpty({ message: 'Product size is required' })
  size: LingerieSize;

  constructor({ size }: LingerieProps) {
    this.size = size;
  }
}
