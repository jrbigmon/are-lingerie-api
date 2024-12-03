import { Inject, Injectable } from '@nestjs/common';
import { Bag } from '../../../domain/bag/entity/bag';
import { BagRepositoryInterface } from './bag.repository.interface';
import { Model } from 'mongoose';

@Injectable()
export class BagRepository implements BagRepositoryInterface {
  constructor(
    @Inject('BAG_MODEL')
    private readonly bagModel: Model<Bag>,
  ) {}

  findById(id: string): Bag | null {
    throw new Error('Method not implemented.');
  }

  findAll(): Array<Bag> {
    throw new Error('Method not implemented.');
  }

  save(entity: Bag): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
