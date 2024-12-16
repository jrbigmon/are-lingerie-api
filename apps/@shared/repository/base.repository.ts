import { EntityManager, Repository } from 'typeorm';
import { RepositoryInterface } from './repository.interface';

export class BaseRepository<T = any> implements RepositoryInterface<T> {
  constructor(
    protected readonly entityClass: new (...args: any[]) => T,
    protected readonly model: Repository<T>,
  ) {}

  getSQLRepository(entityManager?: EntityManager): Repository<T> {
    if (entityManager) {
      return entityManager.getRepository(this.entityClass);
    }

    return this.model;
  }

  save(entity: T, entityManager?: EntityManager): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
