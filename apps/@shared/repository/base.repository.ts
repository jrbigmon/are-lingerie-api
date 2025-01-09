import { EntityManager, Repository } from 'typeorm';
import { RepositoryInterface } from './repository.interface';
import { Entity } from '../entity/entity';

export class BaseRepository<Model> {
  constructor(
    protected readonly entityClass: new (...args: any[]) => Model,
    protected readonly model: Repository<Model>,
  ) {}

  getSQLRepository(entityManager?: EntityManager): Repository<Model> {
    if (entityManager) {
      return entityManager.getRepository(this.entityClass);
    }

    return this.model;
  }
}
