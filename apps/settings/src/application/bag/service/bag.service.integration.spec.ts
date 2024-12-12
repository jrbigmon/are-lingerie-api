import { Test } from '@nestjs/testing';
import { BagModule } from '../bag.module';
import { BagService } from './bag.service';
import { CreateEmptyBagInput } from '../dto/create-empty-bag.dto';
import { CreateLoadBagInput } from '../dto/create-load-bag.dto';
import { LingerieSize } from '../../../domain/product/entity/lingerie/lingerie';

describe('BagService integration tests', () => {
  let bagService: BagService;

  beforeEach(async () => {
    const fixture = await Test.createTestingModule({
      imports: [BagModule],
    }).compile();

    bagService = fixture.get<BagService>(BagService);

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
});
