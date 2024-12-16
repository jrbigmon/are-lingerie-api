import { EntityManager } from 'typeorm';
import { RepositoryInterface } from '../../../../../@shared/repository/repository.interface';
import { Bag } from '../../../domain/bag/entity/bag';

export interface FindByIdOptions {
  includeProducts?: boolean;
}

export interface BagRepositoryInterface extends RepositoryInterface<Bag> {
  findById(
    id: string,
    options?: FindByIdOptions,
    entityManager?: EntityManager,
  ): Promise<Bag | null>;
  findAll(entityManager?: EntityManager): Promise<Array<Bag>>;
}
