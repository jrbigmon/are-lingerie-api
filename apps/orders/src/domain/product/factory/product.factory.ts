import { generateUUID } from '../../../../../@shared/util/generateUUID';
import { Product } from '../entity/product';

export interface CreateProductInput {
  name: string;
  description: string;
  barcode: string;
  purchasePrice: number;
  sellingPrice: number;
}

export function productFactory() {
  const create = (input: CreateProductInput): Product => {
    const id = generateUUID();

    const { name, description, barcode, purchasePrice, sellingPrice } = input;

    const product = new Product({
      id,
      name,
      description,
      barcode,
      purchasePrice,
      sellingPrice,
    });

    return product;
  };

  return {
    create,
  };
}
