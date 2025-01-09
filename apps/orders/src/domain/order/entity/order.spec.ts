import { Customer } from '../../customer/entity/customer';
import { ProductOrder } from '../../product-order/entity/product-order';
import { Product } from '../../product/entity/product';
import { Address } from '../object-value/address';
import { Order, OrderProps, OrderStatus } from './order';

describe('Order entity', () => {
  let orderProps: OrderProps = null;

  beforeEach(() => {
    orderProps = {
      id: '123',
      customer: new Customer({
        id: '123',
        fullName: 'John Smith',
        email: 'john@smith.com',
        phone: '+55 (11) 91111-1111',
      }),
      billingDate: new Date(),
      deliveryDate: new Date(),
      status: OrderStatus.PROCESSING,
      billingAddress: new Address({
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '12345',
        country: 'United States',
      }),
      productOrders: [
        new ProductOrder({
          id: '123',
          product: new Product({
            id: '123',
            name: 'product 1',
            barcode: '123443545',
            description: 'product 1 description',
            purchasePrice: 100,
            sellingPrice: 100,
          }),
          quantity: 2,
        }),
      ],
    };
  });

  it('should be instantiate a new order', () => {
    const order = new Order(orderProps);

    expect(order.toJSON()).toMatchObject({
      id: '123',
      customer: {
        id: '123',
        fullName: 'John Smith',
        email: 'john@smith.com',
        phone: '+5511911111111',
      },
      billingDate: expect.any(Date),
      deliveryDate: expect.any(Date),
      status: OrderStatus.PROCESSING,
      billingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '12345',
        country: 'United States',
      },
      productOrders: [
        {
          id: '123',
          product: {
            id: '123',
            name: 'product 1',
            barcode: '123443545',
            description: 'product 1 description',
            purchasePrice: 100,
            sellingPrice: 100,
          },
          quantity: 2,
        },
      ],
    });
  });

  it('should be not instantiate a new order when id is missing', () => {
    let errors = [];

    try {
      orderProps.id = null;
      new Order(orderProps);
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toMatchObject([
        {
          className: 'Order',
          message: ['Order id is required'],
          timestamp: expect.any(Date),
          property: 'id',
          value: null,
        },
      ]);
    }
  });

  it('should be not instantiate a new order when customer is missing', () => {
    let errors = undefined;

    try {
      orderProps.customer = null;
      new Order(orderProps);
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toMatchObject([
        {
          className: 'Order',
          message: ['Order customer is required'],
          timestamp: expect.any(Date),
          property: 'customer',
          value: null,
        },
      ]);
    }
  });

  it('should be not instantiate a new order when billingDate is missing', () => {
    let errors = [];

    try {
      orderProps.billingDate = null;
      new Order(orderProps);
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toMatchObject([
        {
          className: 'Order',
          message: ['Order billing date is required'],
          timestamp: expect.any(Date),
          property: 'billingDate',
          value: null,
        },
      ]);
    }
  });

  it('should be not instantiate a new order when deliveryDate is missing', () => {
    let errors = [];

    try {
      orderProps.deliveryDate = null;
      new Order(orderProps);
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toMatchObject([
        {
          className: 'Order',
          message: ['Order delivery date is required'],
          timestamp: expect.any(Date),
          property: 'deliveryDate',
          value: null,
        },
      ]);
    }
  });

  it('should be not instantiate a new order when status is missing', () => {
    let errors = [];

    try {
      orderProps.status = null;
      new Order(orderProps);
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toMatchObject([
        {
          className: 'Order',
          message: ['Order status is required'],
          timestamp: expect.any(Date),
          property: 'status',
          value: null,
        },
      ]);
    }
  });

  it('should be not instantiate a new order when billingAddress is missing', () => {
    let errors = [];

    try {
      orderProps.billingAddress = null;
      new Order(orderProps);
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toMatchObject([
        {
          className: 'Order',
          message: ['Order billing address is required'],
          timestamp: expect.any(Date),
          property: 'billingAddress',
          value: null,
        },
      ]);
    }
  });

  it('should be not instantiate a new order when productOrders is empty', () => {
    let errors = [];

    try {
      orderProps.productOrders = [];
      new Order(orderProps);
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toMatchObject([
        {
          className: 'Order',
          message: ['Product orders must be greater than zero'],
          timestamp: expect.any(Date),
          property: 'productOrders',
          value: [],
        },
      ]);
    }
  });
});
