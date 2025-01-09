import { EntityManager, Repository } from 'typeorm';
import { Entity } from '../entity/entity';

export interface RepositoryInterface<Model, E extends Entity> {
  getSQLRepository(entityManager: EntityManager): Repository<Model>;
  save(entity: E, entityManager?: EntityManager): Promise<void>;
}
