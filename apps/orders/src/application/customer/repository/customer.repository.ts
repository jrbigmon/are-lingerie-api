import { EntityManager, Repository } from 'typeorm';
import { BaseRepository } from '../../../../../@shared/repository/base.repository';
import { CustomerModel } from '../model/customer.model';
import { CustomerRepositoryInterface } from './customer.repository.interface';
import { Inject } from '@nestjs/common';
import { Customer } from '../../../domain/customer/entity/customer';
import { instantiateEntities } from '../../../../utils/instantiate-entites';

const { initCustomer } = instantiateEntities();

export class CustomerRepository
  extends BaseRepository<CustomerModel>
  implements CustomerRepositoryInterface
{
  constructor(
    @Inject('CUSTOMER_MODEL')
    protected readonly customerModel: Repository<CustomerModel>,
  ) {
    super(CustomerModel, customerModel);
  }

  public async save(
    entity: Customer,
    entityManager?: EntityManager,
  ): Promise<void> {
    const model = this.getSQLRepository(entityManager);

    const { id, fullName, email, phone } = entity.toJSON();

    await model.save({
      id,
      fullName,
      email,
      phone,
    });
  }

  public async get(
    id: string,
    entityManager?: EntityManager,
  ): Promise<Customer | null> {
    if (!id) return null;

    const model = this.getSQLRepository(entityManager);

    const customer = await model.findOneBy({
      id,
    });

    return initCustomer(customer);
  }
}
