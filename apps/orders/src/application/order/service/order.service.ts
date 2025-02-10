import { Inject } from '@nestjs/common';
import { CreateOrderInput, CreateOrderOutput } from '../dto/create-order.dto';
import { OrderServiceInterface } from './order.service.interface';
import { OrderRepositoryInterface } from '../repository/order.repository.interface';
import { CustomerRepositoryInterface } from '../../customer/repository/customer.repository.interface';
import { ProductRepositoryInterface } from '../../product/repository/product.repository.interface';
import { ProductOrderRepositoryInterface } from '../../product-order/repository/product-order.repository.interface';
import { orderFactory } from '../../../domain/order/factory/order.factory';
import { EntityManager } from 'typeorm';
import { Order } from '../../../domain/order/entity/order';

const { create } = orderFactory();

export class OrderService implements OrderServiceInterface {
  constructor(
    @Inject('OrderRepository')
    private readonly repository: OrderRepositoryInterface,

    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepositoryInterface,

    @Inject('ProductRepository')
    private readonly productRepository: ProductRepositoryInterface,

    @Inject('ProductOrderRepository')
    private readonly productOrderRepository: ProductOrderRepositoryInterface,
  ) {}

  private async persist(
    order: Order,
    entityManager?: EntityManager,
  ): Promise<void> {
    await this.customerRepository.save(order.getCustomer(), entityManager);

    await this.repository.save(order, entityManager);

    await Promise.all(
      order.getProductOrders().map(async (orderProduct) => {
        await this.productRepository.save(
          orderProduct.getProduct(),
          entityManager,
        );

        await this.productOrderRepository.save(orderProduct, entityManager);
      }),
    );
  }

  public async create(
    input: CreateOrderInput,
    entityManager?: EntityManager,
  ): Promise<CreateOrderOutput> {
    const { customer, billingAddress, products } = input;

    const order = create({ customer, billingAddress, products });

    await this.persist(order, entityManager);

    return {
      id: order.getId(),
      status: order.getStatus(),
    };
  }
}
