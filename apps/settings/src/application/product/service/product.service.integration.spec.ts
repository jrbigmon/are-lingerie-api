import { Test } from '@nestjs/testing';
import { ProductModule } from '../product.module';
import { ProductRepositoryInterface } from '../repository/product.repository.interface';
import { ProductService } from './product.service';
import { ProductRepository } from '../repository/product.repository';
import { CreateProductInput } from '../dto/create-product.dto';
import { UpdateProductInput } from '../dto/update-product.dto';

describe('ProductService integration tests', () => {
  let productService: ProductService;
  let repository: ProductRepositoryInterface;

  beforeEach(async () => {
    const fixture = await Test.createTestingModule({
      imports: [ProductModule],
    }).compile();

    productService = fixture.get<ProductService>(ProductService);
    repository = fixture.get<ProductRepositoryInterface>(ProductRepository);

    await fixture.init();
  });

  it('should be defined productService', () => {
    expect(productService).toBeDefined();
  });

  describe('create', () => {
    it('should be create a new generic product', async () => {
      const input: CreateProductInput = {
        name: 'Product 1',
        description: 'Description 1',
        barcode: '1234567890',
        type: undefined,
        size: undefined,
      };

      const output = await productService.create(input);

      expect(output).toMatchObject({
        id: expect.any(String),
        name: 'Product 1',
        description: 'Description 1',
        barcode: '1234567890',
        type: 'Generic',
        size: null,
      });
    });
  });

  describe('update', () => {
    it('should be update a generic product', async () => {
      const input: CreateProductInput = {
        name: 'Product 1',
        description: 'Description 1',
        barcode: '1234567890',
        type: undefined,
        size: undefined,
      };

      const productCreated = await productService.create(input);

      const updatedInput: UpdateProductInput = {
        name: 'Product 1 Updated',
        description: 'Description 1 Updated',
        barcode: '1234567890',
        type: undefined,
        size: undefined,
      };

      const updatedOutput = await productService.update(
        productCreated.id,
        updatedInput,
      );

      expect(updatedOutput).toMatchObject({
        id: productCreated.id,
        name: 'Product 1 Updated',
        description: 'Description 1 Updated',
        barcode: '1234567890',
        type: 'Generic',
        size: null,
      });
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      const input: CreateProductInput = {
        name: 'Product 1',
        description: 'Description 1',
        barcode: '1234567890',
        type: undefined,
        size: undefined,
      };

      const productCreated = await productService.create(input);

      await productService.delete(productCreated.id);

      await expect(repository.findById(productCreated.id)).resolves.toBeNull();
    });
  });

  describe('list', () => {
    it('should list all products', async () => {
      const input: CreateProductInput = {
        name: 'Product 1',
        description: 'Description 1',
        barcode: '1234567890',
        type: undefined,
        size: undefined,
      };

      await productService.create(input);

      const output = await productService.list({});

      expect(output).toMatchObject([
        {
          id: expect.any(String),
          name: 'Product 1',
          description: 'Description 1',
          barcode: '1234567890',
          type: 'Generic',
          size: null,
        },
      ]);
    });
  });

  describe('get', () => {
    it('should get a product by id', async () => {
      const input: CreateProductInput = {
        name: 'Product 1',
        description: 'Description 1',
        barcode: '1234567890',
        type: undefined,
        size: undefined,
      };

      const productCreated = await productService.create(input);

      const output = await productService.get(productCreated.id);

      expect(output).toMatchObject({
        id: productCreated.id,
        name: 'Product 1',
        description: 'Description 1',
        barcode: '1234567890',
        type: 'Generic',
        size: null,
      });
    });
  });
});
