import { EntityManager } from 'typeorm';
import { RepositoryInterface } from '../../../../../@shared/repository/repository.interface';
import { Bag } from '../../../domain/bag/entity/bag';
import { BagModel } from '../model/bag.model';

export interface FindByIdOptions {
  includeProducts?: boolean;
}

export interface BagRepositoryInterface
  extends RepositoryInterface<BagModel, Bag> {
  findById(
    id: string,
    options?: FindByIdOptions,
    entityManager?: EntityManager,
  ): Promise<Bag | null>;
  findAll(entityManager?: EntityManager): Promise<Array<Bag>>;
}
