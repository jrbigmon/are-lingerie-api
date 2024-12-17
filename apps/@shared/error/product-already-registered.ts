import { Product } from '../../settings/src/domain/product/entity/product';
import { BaseError } from './base-error';

export class ProductAlreadyRegistered extends BaseError {
  public statusCode: 400;

  constructor(code: string) {
    super(Product.name, `Product already registered with the code: ${code}`);
  }
}
