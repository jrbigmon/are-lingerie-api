import { Inject, Injectable } from '@nestjs/common';
import { ProductServiceInterface } from './product.service.interface';
import { ProductRepositoryInterface } from '../repository/product.repository.interface';
import {
  CreateProductInput,
  CreateProductOutput,
} from '../dto/create-product.dto';
import { DeleteProductOutput } from '../dto/delete-product.dto';
import { GetProductOutput } from '../dto/get-product.dto';
import { ListProductInput, ListProductOutput } from '../dto/list-product.dto';
import {
  UpdateProductInput,
  UpdateProductOutput,
} from '../dto/update-product.dto';
import { createProductService } from '../../../domain/product/service/create-product.service';
import { updateProductService } from '../../../domain/product/service/update-product.service';
import { BagServiceInterface } from '../../bag/service/bag.service.interface';

const { createOne } = createProductService();
const { updateOne } = updateProductService();

@Injectable()
export class ProductService implements ProductServiceInterface {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductRepositoryInterface,
    @Inject('BagService')
    private readonly bagService: BagServiceInterface,
  ) {}

  async create(input: CreateProductInput): Promise<CreateProductOutput> {
    const product = createOne(input);

    await this.bagService.addProduct(input.bagId, product);

    const { id, name, description, barcode, type, size } = product.toJSON();

    return {
      id,
      name,
      description,
      barcode: barcode.getCode(),
      type,
      size,
    };
  }

  async update(
    id: string,
    input: UpdateProductInput,
  ): Promise<UpdateProductOutput> {
    if (!id) return null;

    const product = await this.repository.findById(id, { includeBag: true });

    updateOne(product, input);

    await this.bagService.addProduct(product.getBag().getId(), product);

    const { name, description, barcode, type, size } = product.toJSON();

    return {
      id,
      name,
      description,
      barcode: barcode.getCode(),
      type,
      size,
    };
  }

  async delete(id: string): Promise<DeleteProductOutput> {
    if (!id) return;

    const product = await this.repository.findById(id);

    if (!product) {
      return;
    }

    await this.repository.delete(product);
  }

  async list(input: ListProductInput): Promise<ListProductOutput> {
    const products = await this.repository.findAll();

    const output = products.map((productModel) => {
      const product = productModel.toJSON();

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        barcode: product.barcode.getCode(),
        type: product.type,
        size: product.size,
      };
    });

    return output;
  }

  async get(id: string): Promise<GetProductOutput | null> {
    if (!id) return null;

    const product = await this.repository.findById(id);

    if (!product) return null;

    const { name, description, barcode, size, type } = product.toJSON();

    return {
      id,
      name,
      description,
      barcode: barcode.getCode(),
      type,
      size,
    };
  }
}
