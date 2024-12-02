import { LingerieSize } from '../../product/entity/lingerie/lingerie';
import { Barcode } from '../../product/object-value/barcode';
import { Bag } from '../entity/bag';
import { createBagService } from './create-bag.service';

describe('createBagService', () => {
  it('should be create a empty bag', () => {
    const { createEmpty } = createBagService();

    const bag = createEmpty({
      description: 'Bag 1',
      dateOfReceipt: new Date('2022-01-01'),
      deliveryDate: new Date('2022-01-15'),
    });

    expect(bag).toBeInstanceOf(Bag);
    expect(bag.toJSON()).toMatchObject({
      id: expect.any(String),
      description: 'Bag 1',
      dateRange: {
        dateOfReceipt: new Date('2022-01-01'),
        deliveryDate: new Date('2022-01-15'),
      },
    });
  });

  it('should be create a loaded bag', () => {
    const { createLoaded } = createBagService();

    const bag = createLoaded({
      description: 'Bag 1',
      dateOfReceipt: new Date('2022-01-01'),
      deliveryDate: new Date('2022-01-15'),
      products: [
        {
          name: 'Lingerie 1',
          description: 'Its a lingerie',
          barcode: '1234567890',
          size: LingerieSize.SMALL,
          type: 'Lingerie',
        },

        {
          name: 'generic product',
          description: 'Its a generic product',
          barcode: '123321111',
        },
      ],
    });

    expect(bag).toBeInstanceOf(Bag);
    expect(bag.toJSON()).toMatchObject({
      id: expect.any(String),
      description: 'Bag 1',
      dateRange: {
        dateOfReceipt: new Date('2022-01-01'),
        deliveryDate: new Date('2022-01-15'),
      },
      products: [
        {
          id: expect.any(String),
          name: 'Lingerie 1',
          description: 'Its a lingerie',
          barcode: new Barcode('1234567890'),
          size: LingerieSize.SMALL,
          type: 'Lingerie',
        },
        {
          id: expect.any(String),
          name: 'generic product',
          description: 'Its a generic product',
          barcode: new Barcode('123321111'),
        },
      ],
    });
  });
});
