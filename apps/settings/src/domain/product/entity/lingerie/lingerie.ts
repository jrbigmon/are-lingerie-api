import { validateSyncData } from '../../../../../../@shared/validation/validate-sync-data';
import { LingerieValidator } from './lingerie.validation';
import { Product } from '../product';
import { Barcode } from '../../object-value/barcode';
import { Bag } from '../../../bag/entity/bag';

export enum LingerieSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  XL = 'xlarge',
}

export interface LingerieProps {
  id: string;
  name: string;
  description: string;
  barcode: Barcode;
  size: LingerieSize;
  bag?: Bag;
}

export class Lingerie extends Product {
  constructor(props: LingerieProps) {
    super({ ...props, type: Lingerie.name });
    this.size = props.size;
    this.isValid();
  }

  isValid(): boolean {
    super.isValid();

    const errors = validateSyncData(
      new LingerieValidator({ size: this.size as LingerieSize }),
      Lingerie.name,
    );

    if (errors.length) {
      throw errors;
    }

    return true;
  }
}
