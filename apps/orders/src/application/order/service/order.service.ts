import { Inject } from '@nestjs/common';
import { CreateOrderInput, CreateOrderOutput } from '../dto/create-order.dto';
import { OrderServiceInterface } from './order.service.interface';
import { OrderRepositoryInterface } from '../repository/order.repository.interface';

export class OrderService implements OrderServiceInterface {
  constructor(
    @Inject('OrderRepository')
    private readonly repository: OrderRepositoryInterface,
  ) {}

  public async create(input: CreateOrderInput): Promise<CreateOrderOutput> {
    return {};
  }
}
