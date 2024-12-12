import { Entity } from '../../../../../@shared/entity/entity';
import { validateSyncData } from '../../../../../@shared/validation/validate-sync-data';
import { Barcode } from '../object-value/barcode';
import { ProductValidator } from './product.validation';

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  barcode: Barcode;
  type: string;
  size?: string;
}

export abstract class Product extends Entity {
  protected name: string;
  protected description: string;
  protected barcode: Barcode;
  protected type: string;
  protected size?: string | null;

  constructor({ id, name, description, barcode, type, size }: ProductProps) {
    super(id);
    this.name = name;
    this.description = description;
    this.barcode = barcode;
    this.type = type;
    this.size = size ?? null;
  }

  public getId(): string {
    return this.id;
  }

  public getBarcode(): Barcode {
    return this.barcode;
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
    const errors = validateSyncData(
      new ProductValidator(this.toJSON()),
      this.type,
    );

    if (errors.length) {
      throw errors;
    }

    return true;
  }

  setName(name: string): void {
    this.name = name;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setBarcode(barcode: string): void {
    this.barcode = new Barcode(barcode);
  }

  setType(type: string): void {
    this.type = type;
  }

  setSize(size: string | null): void {
    this.size = size;
  }
}
