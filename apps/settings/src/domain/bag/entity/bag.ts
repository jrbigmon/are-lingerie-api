import { Entity } from '../../../../../@shared/entity/entity';
import { Product } from '../../product/entity/product';
import { DateRange } from '../object-value/date-range';

export interface BagProps {
  id: string;
  description: string;
  dateOfReceipt: Date;
  deliveryDate: Date;
}

export class Bag extends Entity {
  private description: string;
  private dateRange: DateRange;
  private products: Map<string, Product> = new Map();

  constructor({ id, description, dateOfReceipt, deliveryDate }: BagProps) {
    super(id);
    this.description = description;
    this.dateRange = new DateRange({ dateOfReceipt, deliveryDate });
  }

  addProduct(product: Product) {
    this.products.set(product.getId(), product);
  }

  getProducts(): Array<Product> {
    return Array.from(this.products.values()).map((product) => product);
  }

  toJSON() {
    return {
      id: this.id,
      description: this.description,
      dateOfReceipt: this.dateRange.getDateOfReceipt(),
      deliveryDate: this.dateRange.getDeliveryDate(),
      products: Array.from(this.products.values()).map((product) =>
        product.toJSON(),
      ),
    };
  }

  isValid(): boolean {
    throw new Error('Method not implemented.');
  }
}
