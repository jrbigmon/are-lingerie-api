import { Test } from '@nestjs/testing';
import { ProductRepositoryInterface } from '../repository/product.repository.interface';
import { ProductService } from './product.service';
import { ProductModule } from '../product.module';
import { ProductRepository } from '../repository/product.repository';
import { Product } from '../../../domain/product/entity/product';

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

  describe('get', () => {
    it('should be get the product', async () => {
      await repository.save(
        new Product({
          id: '123',
          name: 'product 1',
          description: 'product description',
          barcode: '12345678910',
          purchasePrice: 100,
          sellingPrice: 98,
        }),
      );

      const result = await productService.get('123');

      expect(result).toMatchObject({
        id: '123',
        name: 'product 1',
        description: 'product description',
        barcode: '12345678910',
        sellingPrice: 98,
        purchasePrice: 100,
        percentOfDiscount: 2,
      });
    });
  });
});
