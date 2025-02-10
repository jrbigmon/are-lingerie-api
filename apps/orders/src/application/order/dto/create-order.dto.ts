import { OrderStatus } from '../../../domain/order/entity/order';

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

export interface CreateOrderOutput {
  id: string;
  status: OrderStatus;
}
