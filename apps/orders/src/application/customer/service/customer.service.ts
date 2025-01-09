import { Inject } from '@nestjs/common';
import { CustomerRepositoryInterface } from '../repository/customer.repository.interface';
import { CustomerServiceInterface } from './customer.service.interface';
import {
  FindOrCreateCustomerInput,
  FindOrCreateCustomerOutput,
} from '../dto/find-or-create-customer.dto';
import { Customer } from '../../../domain/customer/entity/customer';

export class CustomerService implements CustomerServiceInterface {
  constructor(
    @Inject('CustomerRepository')
    private readonly repository: CustomerRepositoryInterface,
  ) {}

  async findOrCreate(
    input: FindOrCreateCustomerInput,
  ): Promise<FindOrCreateCustomerOutput> {
    throw new Error('not implemented');
  }
}
