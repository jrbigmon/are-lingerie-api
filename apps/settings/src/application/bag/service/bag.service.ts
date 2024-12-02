import {
  createEmptyBagService,
  createLoadedBagService,
} from '../../../domain/bag/service/create-bag.service';
import {
  CreateEmptyBagInput,
  CreateEmptyBagOutput,
} from '../dto/create-empty-bag.dto';
import {
  CreateLoadBagInput,
  CreateLoadBagOutput,
} from '../dto/create-load-bag.dto';
import { BagRepositoryInterface } from '../repository/bag.repository.interface';
import { BagServiceInterface } from './bag.service.interface';

export class BagService implements BagServiceInterface {
  constructor(private readonly repository: BagRepositoryInterface) {}

  public async createEmptyBag(
    input: CreateEmptyBagInput,
  ): Promise<CreateEmptyBagOutput> {
    const bag = createEmptyBagService(input);

    await this.repository.save(bag);

    const { id, dateRange, description } = bag.toJSON();

    return {
      id,
      description,
      dateOfReceipt: dateRange.getDateOfReceipt(),
      deliveryDate: dateRange.getDeliveryDate(),
    };
  }

  public async createLoadedBag(
    input: CreateLoadBagInput,
  ): Promise<CreateLoadBagOutput> {
    const bag = createLoadedBagService(input);

    await this.repository.save(bag);

    const { id, dateRange, description } = bag.toJSON();

    return {
      id,
      description,
      dateOfReceipt: dateRange.getDateOfReceipt(),
      deliveryDate: dateRange.getDeliveryDate(),
    };
  }
}
