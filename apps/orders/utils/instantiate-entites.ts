import { CustomerModel } from '../src/application/customer/model/customer.model';
import { Customer } from '../src/domain/customer/entity/customer';

export const instantiateEntities = () => {
  const initCustomer = (customer: CustomerModel): Customer => {
    return new Customer({
      id: customer.id,
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
    });
  };

  return {
    initCustomer,
  };
};
