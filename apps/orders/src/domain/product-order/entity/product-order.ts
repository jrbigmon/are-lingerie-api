import { Entity } from '../../../../../@shared/entity/entity';
import { validateSyncData } from '../../../../../@shared/validation/validate-sync-data';
import { Product } from '../../product/entity/product';
import { ProductOrderValidation } from './product-order.validation';

export interface ProductOrderProps {
  id: string;
  product: Product;
  quantity?: number;
}

export class ProductOrder extends Entity {
  private product: Product;
  private quantity: number;

  constructor({ id, product, quantity = 1 }: ProductOrderProps) {
    super(id);
    this.product = product;
    this.quantity = quantity;
    this.isValid();
  }

  getProduct(): Product {
    return this.product;
  }

  getQuantity(): number {
    return this.quantity;
  }

  toJSON() {
    return {
      id: this.id,
      product: this.product,
      quantity: this.quantity,
    };
  }

  isValid(): boolean {
    const errors = validateSyncData(
      new ProductOrderValidation(this.toJSON()),
      ProductOrder.name,
    );

    if (errors.length) {
      throw errors;
    }

    return true;
  }

  getTotal(): number {
    return this.quantity * this.product.getSellingPrice();
  }
}
