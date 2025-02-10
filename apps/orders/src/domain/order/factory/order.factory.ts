import { generateUUID } from '../../../../../@shared/util/generateUUID';
import { Customer } from '../../customer/entity/customer';
import { productOrderFactory } from '../../product-order/factory/product-order.factory';
import { productFactory } from '../../product/factory/product.factory';
import { Order, OrderStatus } from '../entity/order';
import { Address } from '../object-value/address';

const { create: createProductOrder } = productOrderFactory();
const { create: createProduct } = productFactory();

export interface CreateOrderInput {
  customer: {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  products: {
    name: string;
    description: string;
    barcode: string;
    purchasePrice: number;
    sellingPrice: number;
    quantity: number;
    originProductId: string;
  }[];
}

export function orderFactory() {
  const create = (input: CreateOrderInput): Order => {
    const id = generateUUID();

    const customer = new Customer({
      id: input.customer.id,
      email: input.customer.email,
      fullName: input.customer.fullName,
      phone: input.customer.phone,
    });

    const billingAddress = new Address({
      street: input.billingAddress.street,
      city: input.billingAddress.city,
      state: input.billingAddress.state,
      zipCode: input.billingAddress.zipCode,
      country: input.billingAddress.country,
    });

    const productOrders = input.products.map((product) => {
      return createProductOrder({
        product: createProduct({
          name: product.name,
          barcode: product.barcode,
          description: product.description,
          purchasePrice: product.purchasePrice,
          sellingPrice: product.sellingPrice,
          originalProductId: product.originProductId,
        }),
        quantity: product.quantity,
        orderId: id,
      });
    });

    const order = new Order({
      id,
      customer,
      billingDate: new Date(),
      billingAddress,
      status: OrderStatus.PROCESSING,
      productOrders,
      deliveryDate: null,
    });

    return order;
  };

  return {
    create,
  };
}
