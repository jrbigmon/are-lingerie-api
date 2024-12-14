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
import { ListBagInput, ListBagOutput } from '../dto/list-bag.dto';
import { GetBagOutput } from '../dto/get-bag.dto';
import { ProductRepositoryInterface } from '../../product/repository/product.repository.interface';

@Injectable()
export class BagService implements BagServiceInterface {
  constructor(
    @Inject('BagRepository')
    private readonly repository: BagRepositoryInterface,
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepositoryInterface,
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

  public async list(input: ListBagInput = {}): Promise<ListBagOutput> {
    const bags = await this.repository.findAll();

    const output = bags.map((bagClass) => {
      const bag = bagClass.toJSON();

      return {
        id: bag.id,
        description: bag.description,
        dateOfReceipt: bag.dateRange.getDateOfReceipt(),
        deliveryDate: bag.dateRange.getDeliveryDate(),
      };
    });

    return output;
  }

  public async get(id: string): Promise<GetBagOutput | null> {
    const bag = await this.repository.findById(id);

    if (!bag) return null;

    const { dateRange, description } = bag.toJSON();

    return {
      id,
      description,
      dateOfReceipt: dateRange.getDateOfReceipt(),
      deliveryDate: dateRange.getDeliveryDate(),
    };
  }

  public async addProduct(id: string, productId: string): Promise<boolean> {
    if (!id || !productId) return false;

    const getProduct = this.productRepository.findById(productId);
    const getBag = this.repository.findById(id, { includeProducts: true });

    const [product, bag] = await Promise.all([getProduct, getBag]);

    if (!bag || !product) return false;

    bag.addProduct(product);

    await this.repository.save(bag);

    return true;
  }
}
