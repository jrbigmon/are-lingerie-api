import { EntityManager } from 'typeorm';
import { RepositoryInterface } from '../../../../../@shared/repository/repository.interface';
import { Customer } from '../../../domain/customer/entity/customer';
import { CustomerModel } from '../model/customer.model';

export interface CustomerRepositoryInterface
  extends RepositoryInterface<CustomerModel, Customer> {
  get(id: string, entityManager?: EntityManager): Promise<Customer | null>;
}
