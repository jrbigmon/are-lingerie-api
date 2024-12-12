import { IsNotEmpty } from 'class-validator';
import { LingerieProps, LingerieSize } from './lingerie';

export class LingerieValidator {
  @IsNotEmpty({ message: 'Product size is required' })
  size: LingerieSize;

  constructor({ size }: Pick<LingerieProps, 'size'>) {
    this.size = size;
  }
}
