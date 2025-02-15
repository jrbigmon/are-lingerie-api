import { Entity } from '../../../../../@shared/entity/entity';
import { validateSyncData } from '../../../../../@shared/validation/validate-sync-data';
import { ProductValidation } from './product.validation';

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  barcode: string;
  purchasePrice: number;
  sellingPrice: number;
  originalProductId: string;
}

export class Product extends Entity {
  private name: string;
  private description: string;
  private barcode: string;
  private purchasePrice: number;
  private sellingPrice: number;
  private originalProductId: string;

  constructor({
    id,
    name,
    description,
    barcode,
    purchasePrice,
    sellingPrice,
    originalProductId,
  }: ProductProps) {
    super(id);
    this.name = name;
    this.description = description;
    this.barcode = barcode;
    this.purchasePrice = purchasePrice;
    this.sellingPrice = sellingPrice;
    this.originalProductId = originalProductId;
    this.isValid();
  }

  isValid(): boolean {
    const errors = validateSyncData(new ProductValidation(this), Product.name);

    if (errors.length) {
      throw errors;
    }

    return true;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      barcode: this.barcode,
      purchasePrice: this.purchasePrice,
      sellingPrice: this.sellingPrice,
      originalProductId: this.originalProductId,
    };
  }

  getPurchasePrice(): number {
    return this.purchasePrice;
  }

  getSellingPrice(): number {
    return this.sellingPrice;
  }

  getPercentOfDiscount(): number {
    const sellingPrice = this.getSellingPrice();
    const purchasePrice = this.getPurchasePrice();

    return 100 - (sellingPrice * 100) / purchasePrice;
  }
}
