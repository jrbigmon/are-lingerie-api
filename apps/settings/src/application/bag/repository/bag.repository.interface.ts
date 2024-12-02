import { RepositoryInterface } from '../../../../../@shared/repository/repository.interface';
import { Bag } from '../../../domain/bag/entity/bag';

export interface BagRepositoryInterface extends RepositoryInterface<Bag> {
  findById(id: string): Bag | null;
  findAll(): Array<Bag>;
}
