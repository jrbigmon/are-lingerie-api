import { Test } from '@nestjs/testing';
import { ProductModule } from '../product.module';
import { ProductRepositoryInterface } from '../repository/product.repository.interface';
import { ProductService } from './product.service';
import { ProductRepository } from '../repository/product.repository';
import { CreateProductInput } from '../dto/create-product.dto';

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
});
