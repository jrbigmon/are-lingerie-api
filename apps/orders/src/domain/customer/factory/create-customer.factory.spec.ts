import { createCustomerFactory } from './create-customer.factory';

describe('createCustomerFactory', () => {
  it('should be create a customer', () => {
    const { create } = createCustomerFactory();

    const customer = create({
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '+55 (11) 91111-1111',
    });

    expect(customer.toJSON()).toMatchObject({
      id: expect.any(String),
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '+5511911111111',
    });
  });
});
