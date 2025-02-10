import { Product } from '../../product/entity/product';
import { productOrderFactory } from './product-order.factory';

describe('productOrderFactory', () => {
  it('should be create a new product order', () => {
    const { create } = productOrderFactory();

    const input = {
      quantity: 1,
      product: new Product({
        id: '123',
        barcode: '12333321321',
        name: 'Product 1',
        description: 'Product description',
        purchasePrice: 100,
        sellingPrice: 100,
        originalProductId: '123',
      }),
      orderId: '123',
    };

    const productOrder = create(input);

    expect(productOrder.toJSON()).toMatchObject({
      id: expect.any(String),
      quantity: 1,
      product: {
        id: '123',
        barcode: '12333321321',
        name: 'Product 1',
        description: 'Product description',
        purchasePrice: 100,
        sellingPrice: 100,
      },
      orderId: '123',
    });
  });
});
