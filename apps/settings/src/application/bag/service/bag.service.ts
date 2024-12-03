import { Inject, Injectable } from '@nestjs/common';
import { createBagService } from '../../../domain/bag/service/create-bag.service';
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

@Injectable()
export class BagService implements BagServiceInterface {
  constructor(
    @Inject('BagRepository')
    private readonly repository: BagRepositoryInterface,
  ) {}

  public async createEmptyBag(
    input: CreateEmptyBagInput,
  ): Promise<CreateEmptyBagOutput> {
    const { createEmpty } = createBagService();

    const bag = createEmpty(input);

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
    const { createLoaded } = createBagService();

    const bag = createLoaded(input);

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
