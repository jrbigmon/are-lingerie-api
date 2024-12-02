import { Barcode } from '../../object-value/barcode';
import { Generic } from './generic';

describe('Generic entity', () => {
  it('should be instantiate a new generic product', () => {
    const props = {
      id: '123',
      name: 'Generic Product 1',
      description: 'Description 1',
      barcode: new Barcode('1234567890'),
    };

    const genericProduct = new Generic(props);

    expect(genericProduct.toJSON()).toMatchObject({
      ...props,
      type: Generic.name,
      id: expect.any(String),
    });
  });
});
