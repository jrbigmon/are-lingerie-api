import { EntityManager } from 'typeorm';
import { Entity } from '../entity/entity';

export interface RepositoryInterface<Model, E extends Entity> {
  save(entity: E, entityManager?: EntityManager): Promise<void>;
}
