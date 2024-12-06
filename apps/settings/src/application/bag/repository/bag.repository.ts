import { Inject, Injectable } from '@nestjs/common';
import { Bag } from '../../../domain/bag/entity/bag';
import { BagRepositoryInterface } from './bag.repository.interface';
import { Model } from 'mongoose';
import { Repository } from 'typeorm';
import { BagModel } from '../model/bag.model';
import { DateRange } from '../../../domain/bag/object-value/date-range';

@Injectable()
export class BagRepository implements BagRepositoryInterface {
  constructor(
    @Inject('BAG_MODEL')
    private readonly bagModel: Repository<BagModel>,
  ) {}

  private instantiateEntity(model: BagModel): Bag {
    return new Bag({
      id: model.id,
      description: model.description,
      dateRange: new DateRange({
        dateOfReceipt: model.dateOfReceipt,
        deliveryDate: model.deliveryDate,
      }),
    });
  }

  async findById(id: string): Promise<Bag | null> {
    if (!id) return null;

    const bagModel = await this.bagModel.findOneBy({
      id,
    });

    if (!bagModel) return null;

    return this.instantiateEntity(bagModel);
  }

  async findAll(): Promise<Array<Bag>> {
    const bagModels = await this.bagModel.find({});

    return bagModels.map((model) => this.instantiateEntity(model));
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
