import { RepositoryInterface } from '../../../../../@shared/repository/repository.interface';
import { Bag } from '../../../domain/bag/entity/bag';

export interface FindByIdOptions {
  includeProducts?: boolean;
}

export interface BagRepositoryInterface extends RepositoryInterface<Bag> {
  findById(id: string, options?: FindByIdOptions): Promise<Bag | null>;
  findAll(): Promise<Array<Bag>>;
}
