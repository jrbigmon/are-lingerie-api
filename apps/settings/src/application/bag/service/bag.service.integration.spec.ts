import { Test } from '@nestjs/testing';
import { BagModule } from '../bag.module';
import { BagService } from './bag.service';
import { CreateEmptyBagInput } from '../dto/create-empty-bag.dto';
import { CreateLoadBagInput } from '../dto/create-load-bag.dto';
import { LingerieSize } from '../../../domain/product/entity/lingerie/lingerie';
import { BagRepositoryInterface } from '../repository/bag.repository.interface';
import { BagRepository } from '../repository/bag.repository';
import { Bag } from '../../../domain/bag/entity/bag';
import { DateRange } from '../../../domain/bag/object-value/date-range';
import { Product } from '../../../domain/product/entity/product';
import { Generic } from '../../../domain/product/entity/generic/generic';
import { Barcode } from '../../../domain/product/object-value/barcode';
import { ProductRepository } from '../../product/repository/product.repository';
import { ProductRepositoryInterface } from '../../product/repository/product.repository.interface';

describe('BagService integration tests', () => {
  let bagService: BagService;
  let repository: BagRepositoryInterface;
  let productRepository: ProductRepositoryInterface;

  beforeEach(async () => {
    const fixture = await Test.createTestingModule({
      imports: [BagModule],
    }).compile();

    bagService = fixture.get<BagService>(BagService);
    repository = fixture.get<BagRepositoryInterface>(BagRepository);
    productRepository =
      fixture.get<ProductRepositoryInterface>(ProductRepository);

    await fixture.init();
  });

  it('should be defined bagService', () => {
    expect(bagService).toBeDefined();
  });

  describe('createEmptyBag', () => {
    it('should create empty bag', async () => {
      const input: CreateEmptyBagInput = {
        description: 'Bag 1',
        dateOfReceipt: '2022-01-01',
        deliveryDate: '2022-01-15',
      };

      const output = await bagService.createEmptyBag(input);

      expect(output).toMatchObject({
        id: expect.any(String),
        description: 'Bag 1',
        dateOfReceipt: new Date('2022-01-01'),
        deliveryDate: new Date('2022-01-15'),
      });
    });

    it('should throw a exception when has invalid field', async () => {
      const input: CreateEmptyBagInput = {
        description: '',
        dateOfReceipt: '2022-01-01',
        deliveryDate: '2022-01-15',
      };

      await expect(bagService.createEmptyBag(input)).rejects.toBeDefined();
    });
  });

  describe('createLoadedBag', () => {
    it('should create a loaded bag', async () => {
      const input: CreateLoadBagInput = {
        description: 'Bag 2',
        dateOfReceipt: '2022-01-01',
        deliveryDate: '2022-01-15',
        products: [
          {
            name: 'Lingerie 1',
            description: 'Its a lingerie',
            barcode: '1234567890',
            type: 'lingerie',
            size: LingerieSize.SMALL,
          },
        ],
      };

      const output = await bagService.createLoadedBag(input);

      expect(output).toMatchObject({
        id: expect.any(String),
        description: 'Bag 2',
        dateOfReceipt: new Date('2022-01-01'),
        deliveryDate: new Date('2022-01-15'),
      });
    });

    it('should throw a exception when has a invalid product', async () => {
      const input: CreateLoadBagInput = {
        description: 'Bag 2',
        dateOfReceipt: '2022-01-01',
        deliveryDate: '2022-01-15',
        products: [
          {
            name: '',
            description: 'Its a lingerie',
            barcode: '1234567890',
            type: 'lingerie',
            size: LingerieSize.SMALL,
          },
        ],
      };

      await expect(bagService.createLoadedBag(input)).rejects.toBeDefined();
    });
  });

  describe('list', () => {
    it('should list all bags', async () => {
      await repository.save(
        new Bag({
          id: '123',
          description: 'Bag 1',
          dateRange: new DateRange({
            dateOfReceipt: new Date('2022-01-01'),
            deliveryDate: new Date('2022-01-15'),
          }),
        }),
      );

      const output = await bagService.list();

      expect(output).toMatchObject([
        {
          id: '123',
          description: 'Bag 1',
          dateOfReceipt: new Date('2022-01-01'),
          deliveryDate: new Date('2022-01-15'),
        },
      ]);
    });
  });

  describe('get', () => {
    it('should get a bag by id', async () => {
      const bag = new Bag({
        id: '123',
        description: 'Bag 1',
        dateRange: new DateRange({
          dateOfReceipt: new Date('2022-01-01'),
          deliveryDate: new Date('2022-01-15'),
        }),
      });

      await repository.save(bag);

      const output = await bagService.get('123');

      expect(output).toMatchObject({
        id: '123',
        description: 'Bag 1',
        dateOfReceipt: new Date('2022-01-01'),
        deliveryDate: new Date('2022-01-15'),
      });
    });

    it('should not return a bag when is not found', () => {
      return expect(bagService.get('123')).resolves.toBeNull();
    });
  });

  describe('addProduct', () => {
    it('should add a product to a bag', async () => {
      await repository.save(
        new Bag({
          id: '123',
          description: 'Bag 1',
          dateRange: new DateRange({
            dateOfReceipt: new Date('2022-01-01'),
            deliveryDate: new Date('2022-01-15'),
          }),
        }),
      );

      const product = new Generic({
        id: '123',
        name: 'Lingerie 1',
        description: 'Its a lingerie',
        barcode: new Barcode('1234567890'),
      });

      await productRepository.save(product);

      const output = await bagService.addProduct('123', '123');

      const bag = await repository.findById('123', { includeProducts: true });

      expect(output).toBeTruthy();
      expect(bag.getProducts()).toMatchObject([product]);
    });
  });
});
