import { Lingerie, LingerieSize } from '../entity/lingerie/lingerie';
import { createProductFactory } from './create-product.factory';

describe('createProductFactory', () => {
  const { createLingerie } = createProductFactory();

  it('should be create a new product lingerie', () => {
    const input = {
      name: 'Lingerie 1',
      description: 'Description 1',
      barcode: '1234567890',
      size: LingerieSize.SMALL,
    };

    const productCreated = createLingerie(input);

    expect(productCreated).toBeInstanceOf(Lingerie);
    expect(productCreated.toJSON()).toMatchObject({
      id: expect.any(String),
      ...input,
    });
  });
});
