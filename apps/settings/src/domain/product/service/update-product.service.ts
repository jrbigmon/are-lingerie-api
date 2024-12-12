import { Product } from '../entity/product';

export interface UpdateProductInput {
  name?: string;
  description?: string;
  barcode?: string;
  type?: string;
  size?: string | null;
}

export function updateProductService() {
  function updateOne(product: Product, input: UpdateProductInput) {
    if (input.name) product.setName(input.name);
    if (input.description) product.setDescription(input.description);
    if (input.barcode) product.setBarcode(input.barcode);
    if (input.type) product.setType(input.type);
    if (input.size) product.setSize(input.size);

    product.isValid();

    return product;
  }

  return {
    updateOne,
  };
}
