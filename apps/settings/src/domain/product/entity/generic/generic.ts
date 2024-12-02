import { Barcode } from '../../object-value/barcode';
import { Product } from '../product';

export interface GenericProps {
  id: string;
  name: string;
  description: string;
  barcode: Barcode;
}

export class Generic extends Product {
  constructor(props: GenericProps) {
    super({ ...props, type: Generic.name });
    this.isValid();
  }
}
