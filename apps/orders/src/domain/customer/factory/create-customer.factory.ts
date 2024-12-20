import { generateUUID } from '../../../../../@shared/util/generateUUID';
import { Customer } from '../entity/customer';

type CreateCustomerInput = {
  fullName: string;
  email: string;
  phone?: string;
};

export function createCustomerFactory() {
  const create = (input: CreateCustomerInput) => {
    const id = generateUUID();

    const { fullName, email, phone } = input;

    const customer = new Customer({ id, fullName, email, phone });

    return customer;
  };

  return {
    create,
  };
}
