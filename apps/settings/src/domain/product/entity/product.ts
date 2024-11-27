import { AggregateEntity } from 'apps/@shared/entity/aggregate-entity';
import { Barcode } from '../object-value/barcode';
import { validateOrReject, validateSync } from 'class-validator';
import { ProductValidator } from './product.validation';
import { validateSyncData } from 'apps/@shared/validation/validate-sync-data';

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  barcode: string;
  type: string;
}

export abstract class Product extends AggregateEntity {
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
    validateSyncData(new ProductValidator(this.toJSON()));

    return true;
  }
}
