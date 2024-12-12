import { Generic } from '../entity/generic/generic';
import { Lingerie, LingerieSize } from '../entity/lingerie/lingerie';
import { createProductFactory } from '../factory/create-product.factory';

export interface CreateProductInput {
  name: string;
  description: string;
  barcode: string;
  type?: string;
  size?: string;
}

export type CreateListProductInput = CreateProductInput[];

export function createProductService() {
  const { createGeneric, createLingerie } = createProductFactory();

  function createOne(input: CreateProductInput) {
    const { name, description, barcode, type, size } = input;

    let newProduct: Generic | Lingerie = null;

    switch (type) {
      case Lingerie.name: {
        newProduct = createLingerie({
          name,
          description,
          barcode,
          size: size as LingerieSize,
        });
        break;
      }

      default: {
        newProduct = createGeneric({ name, description, barcode });
        break;
      }
    }

    return newProduct;
  }

  function createList(props: CreateListProductInput) {
    return props.map((product) => createOne(product));
  }

  return {
    createOne,
    createList,
  };
}
