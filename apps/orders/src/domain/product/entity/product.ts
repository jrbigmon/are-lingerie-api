import { Entity } from '../../../../../@shared/entity/entity';

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  barcode: string;
  purchasePrice: number;
  sellingPrice: number;
}

export class Product extends Entity {
  private name: string;
  private description: string;
  private barcode: string;
  private purchasePrice: number;
  private sellingPrice: number;

  constructor({
    id,
    name,
    description,
    barcode,
    purchasePrice,
    sellingPrice,
  }: ProductProps) {
    super(id);
    this.name = name;
    this.description = description;
    this.barcode = barcode;
    this.purchasePrice = purchasePrice;
    this.sellingPrice = sellingPrice;
    this.isValid();
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

    return (sellingPrice * 100) / purchasePrice;
  }

  isValid(): boolean {
    // throw new Error('Method not implemented.');
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
    };
  }
}
