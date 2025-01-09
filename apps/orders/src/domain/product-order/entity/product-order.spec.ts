import { Product } from '../../product/entity/product';
import { ProductOrder } from './product-order';

describe('ProductOrder', () => {
  it('should be instantiate a product order', () => {
    const product = new Product({
      id: '123',
      barcode: '12333321321',
      name: 'Product 1',
      description: 'Product description',
      purchasePrice: 100,
      sellingPrice: 100,
    });

    const productOrder = new ProductOrder({
      id: '111',
      product,
      quantity: 2,
    });

    expect(productOrder.toJSON()).toMatchObject({
      id: '111',
      product: {
        id: '123',
        barcode: '12333321321',
        name: 'Product 1',
        description: 'Product description',
        purchasePrice: 100,
        sellingPrice: 100,
      },
      quantity: 2,
    });
    expect(productOrder.getTotal()).toBe(200);
  });

  it('should be not instantiate a product order when the id is missing', () => {
    let errors = [];

    try {
      const product = new Product({
        id: '123',
        barcode: '12333321321',
        name: 'Product 1',
        description: 'Product description',
        purchasePrice: 100,
        sellingPrice: 100,
      });

      new ProductOrder({
        id: '',
        product,
        quantity: 2,
      });
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toBeDefined();
      expect(errors).toMatchObject([
        {
          className: 'ProductOrder',
          message: ['Product order id is required'],
          timestamp: expect.any(Date),
          property: 'id',
          value: '',
        },
      ]);
    }
  });

  it('should be not instantiate a product order when product is missing', () => {
    let errors = [];

    try {
      new ProductOrder({
        id: '123',
        product: null,
        quantity: 2,
      });
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toBeDefined();
      expect(errors).toMatchObject([
        {
          className: 'ProductOrder',
          message: ['Product in product order is required'],
          timestamp: expect.any(Date),
          property: 'product',
          value: null,
        },
      ]);
    }
  });

  it('should be not instantiate a product order when the quantity is less than 1', () => {
    let errors = [];

    try {
      const product = new Product({
        id: '123',
        barcode: '12333321321',
        name: 'Product 1',
        description: 'Product description',
        purchasePrice: 100,
        sellingPrice: 100,
      });

      new ProductOrder({
        id: '123',
        product,
        quantity: 0,
      });
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toBeDefined();
      expect(errors).toMatchObject([
        {
          className: 'ProductOrder',
          message: ['Product order quantity must be greater than 1'],
          timestamp: expect.any(Date),
          property: 'quantity',
          value: 0,
        },
      ]);
    }
  });
});
