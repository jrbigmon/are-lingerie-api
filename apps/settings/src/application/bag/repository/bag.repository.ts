import { Inject, Injectable } from '@nestjs/common';
import { Bag } from '../../../domain/bag/entity/bag';
import {
  BagRepositoryInterface,
  FindByIdOptions,
} from './bag.repository.interface';
import { EntityManager, Repository } from 'typeorm';
import { BagModel } from '../model/bag.model';
import { instantiateEntities } from '../../../../utils/instantiate-entites';
import { ProductModel } from '../../product/model/product.model';
import { BaseRepository } from '../../../../../@shared/repository/base.repository';

const { initBag } = instantiateEntities();

@Injectable()
export class BagRepository
  extends BaseRepository
  implements BagRepositoryInterface
{
  constructor(
    @Inject('BAG_MODEL')
    protected readonly bagModel: Repository<BagModel>,
  ) {
    super(BagModel, bagModel);
  }

  async findById(
    id: string,
    { includeProducts = false }: FindByIdOptions = {},
    entityManager?: EntityManager,
  ): Promise<Bag | null> {
    const model = this.getSQLRepository(entityManager);

    if (!id) return null;

    const bagModel = await model.findOne({
      where: { id },
      relations: {
        products: includeProducts,
      },
    });

    if (!bagModel) return null;

    return initBag(bagModel);
  }

  async findAll(entityManager?: EntityManager): Promise<Array<Bag>> {
    const model = this.getSQLRepository(entityManager);

    const bagModels = await model.find({});

    return bagModels.map((model) => initBag(model));
  }

  async save(entity: Bag, entityManager?: EntityManager): Promise<void> {
    const model = this.getSQLRepository(entityManager);

    const { id, description, dateRange, products } = entity.toJSON();

    await model.save({
      id,
      description,
      dateOfReceipt: dateRange.getDateOfReceipt(),
      deliveryDate: dateRange.getDeliveryDate(),
      products: products?.map((product) => {
        const productModel = new ProductModel();

        productModel.id = product.id;
        productModel.name = product.name;
        productModel.description = product.description;
        productModel.barcode = product.barcode.getCode();
        productModel.type = product.type;
        productModel.size = product.size;

        return productModel;
      }),
    });
  }
}
