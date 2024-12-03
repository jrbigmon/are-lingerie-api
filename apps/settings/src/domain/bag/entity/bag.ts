import { Entity } from '../../../../../@shared/entity/entity';
import { validateSyncData } from '../../../../../@shared/validation/validate-sync-data';
import { Product } from '../../product/entity/product';
import { DateRange } from '../object-value/date-range';
import { BagValidation } from './bag.validation';

export interface BagProps {
  id: string;
  description: string;
  dateRange: DateRange;
}

export class Bag extends Entity {
  private description: string;
  private dateRange: DateRange;
  private products: Map<string, Product> = new Map();

  constructor({ id, description, dateRange }: BagProps) {
    super(id);
    this.description = description;
    this.dateRange = dateRange;
    this.isValid();
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
      dateRange: this.dateRange,
      products: Array.from(this.products.values()).map((product) =>
        product.toJSON(),
      ),
    };
  }

  isValid(): boolean {
    const errors = validateSyncData(new BagValidation(this.toJSON()), Bag.name);

    if (errors.length) {
      throw errors;
    }

    return true;
  }
}