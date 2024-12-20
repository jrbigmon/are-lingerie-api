import { Customer } from './customer';

describe('Customer', () => {
  it('should be instantiate a new customer', () => {
    const customer = new Customer({
      id: '123',
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '+55 (11) 91111-1111',
    });

    expect(customer.toJSON()).toMatchObject({
      id: '123',
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '+5511911111111',
    });
  });

  it('should be not instantiate a new customer when the phone is incorrect', () => {
    let errors = undefined;

    try {
      new Customer({
        id: '123',
        fullName: 'John Doe',
        email: 'johndoe@example.com',
        phone: '11 91111-1111',
      });
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toBeDefined();
      expect(errors).toMatchObject([
        {
          className: 'Customer',
          message: ['Customer phone must be a valid number'],
          property: 'phone',
          timestamp: expect.any(Date),
          value: '11 91111-1111',
        },
      ]);
    }
  });

  it('should be not instantiate a new customer when the id is missing', () => {
    let errors = undefined;

    try {
      new Customer({
        id: '',
        fullName: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+5511911111111',
      });
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toBeDefined();
      expect(errors).toMatchObject([
        {
          className: 'Customer',
          message: ['Customer id is required'],
          property: 'id',
          timestamp: expect.any(Date),
          value: '',
        },
      ]);
    }
  });

  it('should be not instantiate a new customer when the email is incorrect or missing', () => {
    let errors = undefined;

    try {
      new Customer({
        id: '123',
        fullName: 'John Doe',
        email: '',
        phone: '+5511911111111',
      });
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toBeDefined();
      expect(errors).toMatchObject([
        {
          className: 'Customer',
          message: ['Customer email must be a valid email address'],
          property: 'email',
          timestamp: expect.any(Date),
          value: '',
        },
      ]);
    }

    try {
      new Customer({
        id: '123',
        fullName: 'John Doe',
        email: 'aaaaaa.com.br',
        phone: '+5511911111111',
      });
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toBeDefined();
      expect(errors).toMatchObject([
        {
          className: 'Customer',
          message: ['Customer email must be a valid email address'],
          property: 'email',
          timestamp: expect.any(Date),
          value: 'aaaaaa.com.br',
        },
      ]);
    }
  });

  it('should be not instantiate a new customer when the fullName is missing', () => {
    let errors = undefined;

    try {
      new Customer({
        id: '123',
        fullName: '',
        email: 'johndoe@example.com',
        phone: '+5511911111111',
      });
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toBeDefined();
      expect(errors).toMatchObject([
        {
          className: 'Customer',
          message: ['Customer full name is required'],
          property: 'fullName',
          timestamp: expect.any(Date),
          value: '',
        },
      ]);
    }
  });
});
