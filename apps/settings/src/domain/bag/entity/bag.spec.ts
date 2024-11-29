import { Lingerie, LingerieSize } from '../../product/entity/lingerie/lingerie';
import { Bag } from './bag';

describe('Bag entity', () => {
  it('should be create a bag empty', () => {
    const bagProperties = {
      id: '123',
      description: 'Bag 1',
      dateOfReceipt: new Date('2022-01-01'),
      deliveryDate: new Date('2022-01-15'),
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
});
