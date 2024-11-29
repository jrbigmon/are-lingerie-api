import { Lingerie, LingerieSize } from '../../product/entity/lingerie/lingerie';
import { Barcode } from '../../product/object-value/barcode';
import {
  CreateBagEmptyInput,
  createBagFactory,
  CreateBagLoadedInput,
} from './create-bag.factory';

describe('createBagFactory', () => {
  const { createLoadedBag, createEmptyBag } = createBagFactory();

  it('should be create a bag loaded', () => {
    const products = [
      new Lingerie({
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        barcode: new Barcode('1234567890'),
        size: LingerieSize.SMALL,
      }),
    ];

    const input: CreateBagLoadedInput = {
      description: 'Bag 1',
      dateOfReceipt: new Date('2022-01-01'),
      deliveryDate: new Date('2022-01-15'),
      products,
    };

    const bag = createLoadedBag(input);

    expect(bag.toJSON()).toMatchObject({
      id: expect.any(String),
      description: 'Bag 1',
      dateRange: {
        dateOfReceipt: new Date('2022-01-01'),
        deliveryDate: new Date('2022-01-15'),
      },
      products: [
        {
          id: '1',
          name: 'Product 1',
          description: 'Description 1',
          barcode: new Barcode('1234567890'),
          size: LingerieSize.SMALL,
        },
      ],
    });
  });

  it('should be create a bag empty', () => {
    const input: CreateBagEmptyInput = {
      description: 'Bag 1',
      dateOfReceipt: new Date('2022-01-01'),
      deliveryDate: new Date('2022-01-15'),
    };

    const bag = createEmptyBag(input);

    expect(bag.toJSON()).toMatchObject({
      id: expect.any(String),
      description: 'Bag 1',
      dateRange: {
        dateOfReceipt: new Date('2022-01-01'),
        deliveryDate: new Date('2022-01-15'),
      },
    });
  });
});
