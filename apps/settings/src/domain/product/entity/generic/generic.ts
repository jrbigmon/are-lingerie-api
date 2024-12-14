import { Bag } from '../../../bag/entity/bag';
import { Barcode } from '../../object-value/barcode';
import { Product } from '../product';

export interface GenericProps {
  id: string;
  name: string;
  description: string;
  barcode: Barcode;
  bag?: Bag;
}

export class Generic extends Product {
  constructor(props: GenericProps) {
    super({ ...props, type: Generic.name });
    this.isValid();
  }
}
