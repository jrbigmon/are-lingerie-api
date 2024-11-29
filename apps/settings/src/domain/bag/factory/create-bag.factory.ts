import { generateUUID } from '../../../../../@shared/util/generateUUID';
import { Product } from '../../product/entity/product';
import { Bag } from '../entity/bag';
import { DateRange } from '../object-value/date-range';

type CreateBagBaseInput = {
  description: string;
  dateOfReceipt: Date;
  deliveryDate: Date;
};

export type CreateBagLoadedInput = {
  description: string;
  products: Array<Product>;
  dateOfReceipt: Date;
  deliveryDate: Date;
};

export type CreateBagEmptyInput = {
  description: string;
  dateOfReceipt: Date;
  deliveryDate: Date;
};

export function createBagFactory() {
  const createBaseBag = (input: CreateBagBaseInput) => {
    const id = generateUUID();

    const { dateOfReceipt, deliveryDate, description } = input;

    const dateRange = new DateRange({ dateOfReceipt, deliveryDate });

    const bag = new Bag({ id, dateRange, description });

    return bag;
  };

  return {
    createLoadedBag(input: CreateBagLoadedInput): Bag {
      const bag = createBaseBag(input);

      input.products.forEach((product) => bag.addProduct(product));

      return bag;
    },

    createEmptyBag(input: CreateBagEmptyInput): Bag {
      const bag = createBaseBag(input);

      return bag;
    },
  };
}
