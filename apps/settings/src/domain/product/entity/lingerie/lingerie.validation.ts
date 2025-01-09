import { IsNotEmpty } from 'class-validator';
import { Lingerie, LingerieProps, LingerieSize } from './lingerie';

export class LingerieValidator {
  @IsNotEmpty({ message: 'Product size is required' })
  size: string;

  constructor(lingerie: Lingerie) {
    this.size = lingerie.getSize();
  }
}
