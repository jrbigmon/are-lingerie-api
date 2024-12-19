import { Product } from '../../settings/src/domain/product/entity/product';
import { BaseError } from './base-error';

export class ProductAlreadyRegistered extends BaseError {
  constructor(code: string) {
    super(Product.name, `Product already registered with the code: ${code}`);
  }
}
