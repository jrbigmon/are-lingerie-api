import { CustomerModel } from '../src/application/customer/model/customer.model';
import { ProductModel } from '../src/application/product/model/product.model';
import { Customer } from '../src/domain/customer/entity/customer';
import { Product } from '../src/domain/product/entity/product';

export const instantiateEntities = () => {
  const initCustomer = (customer: CustomerModel): Customer => {
    return new Customer({
      id: customer.id,
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
    });
  };

  const initProduct = (product: ProductModel): Product => {
    return new Product({
      id: product.id,
      name: product.name,
      description: product.description,
      barcode: product.barcode,
      purchasePrice: product.purchasePrice,
      sellingPrice: product.sellingPrice,
    });
  };

  return {
    initCustomer,
    initProduct,
  };
};
