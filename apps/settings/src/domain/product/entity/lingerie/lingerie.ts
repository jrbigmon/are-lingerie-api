import { validateSyncData } from '../../../../../../@shared/validation/validate-sync-data';
import { LingerieValidator } from './lingerie.validation';
import { Product } from '../product';
import { Barcode } from '../../object-value/barcode';

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
}

export class Lingerie extends Product {
  private size: LingerieSize;

  constructor(props: LingerieProps) {
    super({ ...props, type: Lingerie.name });
    this.size = props.size;
    this.isValid();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      barcode: this.barcode,
      type: this.type,
      size: this.size,
    };
  }

  isValid(): boolean {
    super.isValid();

    const errors = validateSyncData(
      new LingerieValidator(this.toJSON()),
      Lingerie.name,
    );

    if (errors.length) {
      throw errors;
    }

    return true;
  }
}
