import { generateUUID } from '../../../../../@shared/util/generateUUID';
import { Product } from '../../product/entity/product';
import { ProductOrder } from '../entity/product-order';

export interface CreateProductOrderInput {
  quantity: number;
  product: Product;
}

export function productOrderFactory() {
  const create = (input: CreateProductOrderInput): ProductOrder => {
    const id = generateUUID();

    const { quantity, product } = input;

    const productOrder = new ProductOrder({ id, quantity, product });

    return productOrder;
  };

  return {
    create,
  };
}
