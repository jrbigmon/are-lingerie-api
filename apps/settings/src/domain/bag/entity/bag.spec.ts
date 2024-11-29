import { InvalidAttribute } from '../../../../../@shared/error/invalid-attribute';
import { Lingerie, LingerieSize } from '../../product/entity/lingerie/lingerie';
import { DateRange } from '../object-value/date-range';
import { Bag, BagProps } from './bag';

describe('Bag entity', () => {
  it('should be create a bag empty', () => {
    const bagProperties: BagProps = {
      id: '123',
      description: 'Bag 1',
      dateRange: new DateRange({
        dateOfReceipt: new Date('2022-01-01'),
        deliveryDate: new Date('2022-01-15'),
      }),
    };

    const bag = new Bag(bagProperties);

    const product = new Lingerie({
      id: '456',
      name: 'Lingerie 1',
      description: 'Description 1',
      barcode: '1234567890',
      size: LingerieSize.SMALL,
    });

    bag.addProduct(product);

    expect(bag.getProducts()).toHaveLength(1);
    expect(bag.toJSON()).toMatchObject({
      ...bagProperties,
      products: [product.toJSON()],
    });
  });

  it('should be not create a bag when description is missing', () => {
    const bagProperties: BagProps = {
      id: '123',
      description: '',
      dateRange: new DateRange({
        dateOfReceipt: new Date('2022-01-01'),
        deliveryDate: new Date('2022-01-15'),
      }),
    };

    let errors = undefined;

    try {
      new Bag(bagProperties);
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toBeDefined();
      expect(errors).toMatchObject([
        new InvalidAttribute('description', '', 'Bag', [
          'Bag description is required',
        ]),
      ]);
    }
  });

  it('should be not create a bag when date of receipt is missing', () => {
    const bagProperties: BagProps = {
      id: '123',
      description: 'description 123',
      dateRange: null,
    };

    let errors = undefined;

    try {
      new Bag(bagProperties);
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toBeDefined();
      expect(errors).toMatchObject([
        new InvalidAttribute('dateRange', null, 'Bag', [
          'Bag date range is required',
        ]),
      ]);
    }
  });
});
