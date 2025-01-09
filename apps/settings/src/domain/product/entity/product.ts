import { Entity } from '../../../../../@shared/entity/entity';
import { validateSyncData } from '../../../../../@shared/validation/validate-sync-data';
import { Bag } from '../../bag/entity/bag';
import { Barcode } from '../object-value/barcode';
import { ProductValidator } from './product.validation';

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  barcode: Barcode;
  type: string;
  size?: string;
  bag?: Bag;
}

export abstract class Product extends Entity {
  protected name: string;
  protected description: string;
  protected barcode: Barcode;
  protected type: string;
  protected size?: string | null;
  protected bag?: Bag | null;

  constructor({
    id,
    name,
    description,
    barcode,
    type,
    size,
    bag,
  }: ProductProps) {
    super(id);
    this.name = name;
    this.description = description;
    this.barcode = barcode;
    this.type = type;
    this.size = size ?? null;
    this.bag = bag ?? null;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      barcode: this.barcode,
      type: this.type,
      size: this.size,
      bag: this.bag,
    };
  }

  isValid(): boolean {
    const errors = validateSyncData(new ProductValidator(this), this.type);

    if (errors.length) {
      throw errors;
    }

    return true;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  getBarcode(): Barcode {
    return this.barcode;
  }

  setBarcode(barcode: string): void {
    this.barcode = new Barcode(barcode);
  }

  getType(): string {
    return this.type;
  }

  setType(type: string): void {
    this.type = type;
  }

  getSize(): string | null {
    return this.size;
  }

  setSize(size: string | null): void {
    this.size = size;
  }

  getBag(): Bag {
    return this.bag;
  }

  setBag(bag: Bag): void {
    this.bag = bag;
  }
}
