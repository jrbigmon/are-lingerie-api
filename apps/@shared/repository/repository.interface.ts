import { EntityManager, Repository } from 'typeorm';

export interface RepositoryInterface<T> {
  getSQLRepository(entityManager: EntityManager): Repository<T>;
  save(entity: T, entityManager?: EntityManager): Promise<void>;
}
