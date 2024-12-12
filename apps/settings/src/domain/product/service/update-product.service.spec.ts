import { Generic } from '../entity/generic/generic';
import { Barcode } from '../object-value/barcode';
import {
  UpdateProductInput,
  updateProductService,
} from './update-product.service';

describe('updateProductService', () => {
  const { updateOne } = updateProductService();

  it('should be update a product', () => {
    const product = new Generic({
      id: '123',
      name: 'Product',
      description: 'Description',
      barcode: new Barcode('0987654321'),
    });

    const input: UpdateProductInput = {
      name: 'Updated Product',
      description: 'Updated Description',
      barcode: '9876543210',
      type: 'Generic',
    };

    updateOne(product, input);

    expect(product.toJSON()).toMatchObject({
      id: '123',
      name: 'Updated Product',
      description: 'Updated Description',
      barcode: new Barcode('9876543210'),
      type: 'Generic',
      size: null,
    });
  });
});
