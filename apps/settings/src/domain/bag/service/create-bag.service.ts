import { LingerieSize } from '../../product/entity/lingerie/lingerie';
import { createListProductService } from '../../product/service/create-product.service';
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

const { createLoadedBag, createEmptyBag } = createBagFactory();

export function createLoadedBagService(input: CreateBagLoadedInput): Bag {
  const bag = createLoadedBag({
    description: input?.description,
    deliveryDate: new Date(input?.deliveryDate),
    dateOfReceipt: new Date(input?.dateOfReceipt),
    products: createListProductService(input?.products),
  });

  return bag;
}

export function createEmptyBagService(input: CreateBagEmptyInput): Bag {
  const bag = createEmptyBag({
    description: input?.description,
    deliveryDate: new Date(input?.deliveryDate),
    dateOfReceipt: new Date(input?.dateOfReceipt),
  });

  return bag;
}
