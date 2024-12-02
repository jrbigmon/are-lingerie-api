import { createBagFactory } from '../../../domain/bag/factory/create-bag.factory';
import { createProductFactory } from '../../../domain/product/factory/create-product.factory';
import { createListProductService } from '../../../domain/product/service/create-product.service';
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
    const { createEmptyBag } = createBagFactory();

    const bag = createEmptyBag({
      description: input?.description,
      deliveryDate: new Date(input?.deliveryDate),
      dateOfReceipt: new Date(input?.dateOfReceipt),
    });

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
    const { createLoadedBag } = createBagFactory();

    const bag = createLoadedBag({
      description: input?.description,
      deliveryDate: new Date(input?.deliveryDate),
      dateOfReceipt: new Date(input?.dateOfReceipt),
      products: createListProductService(input?.products),
    });

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
