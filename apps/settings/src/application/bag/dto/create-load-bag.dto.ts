import { LingerieSize } from '../../../domain/product/entity/lingerie/lingerie';

export interface CreateLoadBagInput {
  description: string;
  dateOfReceipt: string;
  deliveryDate: string;
  products: {
    name: string;
    description: string;
    barcode: string;
    type: string;
    size?: LingerieSize;
  }[];
}

export interface CreateLoadBagOutput {
  id: string;
  description: string;
  dateOfReceipt: Date;
  deliveryDate: Date;
}
