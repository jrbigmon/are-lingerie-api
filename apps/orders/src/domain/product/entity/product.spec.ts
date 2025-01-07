import { InvalidAttribute } from '../../../../../@shared/error/invalid-attribute';
import { Product } from './product';

describe('Product entity', () => {
  it('should be instantiate product entity', () => {
    const product = new Product({
      id: '123',
      barcode: '12333321321',
      name: 'Product 1',
      description: 'Product description',
      purchasePrice: 100,
      sellingPrice: 100,
    });

    expect(product.toJSON()).toMatchObject({
      id: '123',
      barcode: '12333321321',
      name: 'Product 1',
      description: 'Product description',
      purchasePrice: 100,
      sellingPrice: 100,
    });
  });

  it('should be not instantiate product entity when id is not provided', () => {
    let errors = [];

    try {
      new Product({
        id: null,
        barcode: '12333321321',
        name: 'Product 1',
        description: 'Product description',
        purchasePrice: 100,
        sellingPrice: 100,
      });
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toHaveLength(1);
      expect(errors[0] instanceof InvalidAttribute).toBeTruthy();
      expect(errors[0].property).toEqual('id');
      expect(errors[0].value).toBeNull();
      expect(errors[0].className).toEqual(Product.name);
      expect(errors[0].message).toMatchObject(['Product id is required']);
    }
  });
});
