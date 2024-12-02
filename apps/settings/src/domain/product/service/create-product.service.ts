import { Generic } from '../entity/generic/generic';
import { Lingerie, LingerieSize } from '../entity/lingerie/lingerie';
import { createProductFactory } from '../factory/create-product.factory';

export interface CreateProductInput {
  name: string;
  description: string;
  barcode: string;
  type: string;
  size?: LingerieSize;
}

export type CreateListProductInput = CreateProductInput[];

export function createProductService(props: CreateProductInput) {
  const { createGeneric, createLingerie } = createProductFactory();

  const { name, description, barcode, type, size } = props;

  let newProduct: Generic | Lingerie = null;

  switch (type) {
    case Lingerie.name: {
      newProduct = createLingerie({ name, description, barcode, size });
      break;
    }

    default: {
      newProduct = createGeneric({ name, description, barcode });
      break;
    }
  }

  return newProduct;
}

export function createListProductService(props: CreateListProductInput) {
  return props.map((product) => createProductService(product));
}
