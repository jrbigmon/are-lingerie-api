import { Entity } from '../../../../../@shared/entity/entity';
import { validateSyncData } from '../../../../../@shared/validation/validate-sync-data';
import { Product } from '../../product/entity/product';
import { ProductOrderValidation } from './product-order.validation';

export interface ProductOrderProps {
  id: string;
  product: Product;
  orderId: string;
  quantity?: number;
}

export class ProductOrder extends Entity {
  private product: Product;
  private quantity: number;
  private orderId: string;

  constructor({ id, product, orderId, quantity = 1 }: ProductOrderProps) {
    super(id);
    this.product = product;
    this.quantity = quantity;
    this.orderId = orderId;
    this.isValid();
  }

  toJSON() {
    return {
      id: this.id,
      product: this.product,
      quantity: this.quantity,
      orderId: this.orderId,
    };
  }

  isValid(): boolean {
    const errors = validateSyncData(
      new ProductOrderValidation(this),
      ProductOrder.name,
    );

    if (errors.length) {
      throw errors;
    }

    return true;
  }

  getProduct(): Product {
    return this.product;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getOrderId(): string {
    return this.orderId;
  }

  getTotal(): number {
    return this.quantity * this.product.getSellingPrice();
  }
}
