import { Entity } from '../../../../../@shared/entity/entity';
import { validateSyncData } from '../../../../../@shared/validation/validate-sync-data';
import { Barcode } from '../object-value/barcode';
import { ProductValidator } from './product.validation';

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  barcode: string;
  type: string;
}

export abstract class Product extends Entity {
  protected name: string;
  protected description: string;
  protected barcode: Barcode;
  protected type: string;

  constructor({ id, name, description, barcode, type }: ProductProps) {
    super(id);
    this.name = name;
    this.description = description;
    this.barcode = new Barcode(barcode);
    this.type = type;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      barcode: this.barcode.getCode(),
      type: this.type,
    };
  }

  isValid(): boolean {
    const errors = validateSyncData(
      new ProductValidator(this.toJSON()),
      this.type,
    );

    if (errors.length) {
      throw errors;
    }

    return true;
  }
}
