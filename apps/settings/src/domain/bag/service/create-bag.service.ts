import { LingerieSize } from '../../product/entity/lingerie/lingerie';
import { createProductService } from '../../product/service/create-product.service';
import { Bag } from '../entity/bag';
import { createBagFactory } from '../factory/create-bag.factory';

export interface CreateBagEmptyInput {
  description: string;
  deliveryDate: Date | string;
  dateOfReceipt: Date | string;
}

export interface CreateBagLoadedInput extends CreateBagEmptyInput {
  products: {
    name: string;
    description: string;
    barcode: string;
    type: string;
    size?: LingerieSize;
  }[];
}

export function createBagService() {
  const { createLoadedBag, createEmptyBag } = createBagFactory();
  const { createList } = createProductService();

  function createLoaded(input: CreateBagLoadedInput): Bag {
    const bag = createLoadedBag({
      description: input?.description,
      deliveryDate: new Date(input?.deliveryDate),
      dateOfReceipt: new Date(input?.dateOfReceipt),
      products: createList(input?.products),
    });

    return bag;
  }

  function createEmpty(input: CreateBagEmptyInput): Bag {
    const bag = createEmptyBag({
      description: input?.description,
      deliveryDate: new Date(input?.deliveryDate),
      dateOfReceipt: new Date(input?.dateOfReceipt),
    });

    return bag;
  }

  return {
    createLoaded,
    createEmpty,
  };
}
