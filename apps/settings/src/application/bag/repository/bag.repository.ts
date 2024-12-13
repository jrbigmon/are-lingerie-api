import { Inject, Injectable } from '@nestjs/common';
import { Bag } from '../../../domain/bag/entity/bag';
import {
  BagRepositoryInterface,
  FindByIdOptions,
} from './bag.repository.interface';
import { Repository } from 'typeorm';
import { BagModel } from '../model/bag.model';
import { instantiateEntities } from '../../../../utils/instantiate-entites';

const { initBag } = instantiateEntities();

@Injectable()
export class BagRepository implements BagRepositoryInterface {
  constructor(
    @Inject('BAG_MODEL')
    private readonly bagModel: Repository<BagModel>,
  ) {}

  async findById(
    id: string,
    { includeProducts = false }: FindByIdOptions,
  ): Promise<Bag | null> {
    if (!id) return null;

    const bagModel = await this.bagModel.findOne({
      where: { id: id },
      relations: {
        products: includeProducts,
      },
    });

    if (!bagModel) return null;

    return initBag(bagModel);
  }

  async findAll(): Promise<Array<Bag>> {
    const bagModels = await this.bagModel.find({});

    return bagModels.map((model) => initBag(model));
  }

  async save(entity: Bag): Promise<void> {
    const { id, description, dateRange } = entity.toJSON();

    await this.bagModel.save({
      id,
      description,
      dateOfReceipt: dateRange.getDateOfReceipt(),
      deliveryDate: dateRange.getDeliveryDate(),
    } as BagModel);
  }
}
