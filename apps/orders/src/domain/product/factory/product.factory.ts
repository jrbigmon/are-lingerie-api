import { generateUUID } from '../../../../../@shared/util/generateUUID';
import { Product } from '../entity/product';

export interface CreateProductInput {
  name: string;
  description: string;
  barcode: string;
  purchasePrice: number;
  sellingPrice: number;
  originalProductId: string;
}

export function productFactory() {
  const create = (input: CreateProductInput): Product => {
    const id = generateUUID();

    const {
      name,
      description,
      barcode,
      purchasePrice,
      sellingPrice,
      originalProductId,
    } = input;

    const product = new Product({
      id,
      name,
      description,
      barcode,
      purchasePrice,
      sellingPrice,
      originalProductId,
    });

    return product;
  };

  return {
    create,
  };
}
