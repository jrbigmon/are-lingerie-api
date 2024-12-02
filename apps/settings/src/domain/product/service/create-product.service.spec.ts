import { Generic } from '../entity/generic/generic';
import { Lingerie, LingerieSize } from '../entity/lingerie/lingerie';
import { Barcode } from '../object-value/barcode';
import { createProductService } from './create-product.service';

describe('createProductService', () => {
  const { createList, createOne } = createProductService();

  it('should be create a new generic product', () => {
    const input = {
      name: 'Product 1',
      description: 'Description 1',
      barcode: '1234567890',
    };

    const productCreated = createOne(input);

    expect(productCreated).toBeInstanceOf(Generic);
    expect(productCreated.toJSON()).toMatchObject({
      id: expect.any(String),
      name: 'Product 1',
      description: 'Description 1',
      barcode: new Barcode('1234567890'),
      type: Generic.name,
    });
  });

  it('should be create a new lingerie product', () => {
    const input = {
      name: 'Lingerie 1',
      description: 'Description 1',
      barcode: '1234567890',
      size: LingerieSize.SMALL,
      type: Lingerie.name,
    };

    const productCreated = createOne(input);

    expect(productCreated).toBeInstanceOf(Lingerie);
    expect(productCreated.toJSON()).toMatchObject({
      id: expect.any(String),
      name: 'Lingerie 1',
      description: 'Description 1',
      barcode: new Barcode('1234567890'),
      type: Lingerie.name,
    });
  });

  it('should be create a list of new products', () => {
    const input = [
      {
        name: 'Product 1',
        description: 'Description 1',
        barcode: '1234567890',
      },
      {
        name: 'Lingerie 1',
        description: 'Description 1',
        barcode: '1234567890',
        size: LingerieSize.SMALL,
        type: Lingerie.name,
      },
    ];

    const productsCreated = createList(input);

    expect(productsCreated).toHaveLength(2);
    expect(productsCreated[0]).toBeInstanceOf(Generic);
    expect(productsCreated[1]).toBeInstanceOf(Lingerie);
    expect(productsCreated).toMatchObject([
      {
        id: expect.any(String),
        name: 'Product 1',
        description: 'Description 1',
        barcode: new Barcode('1234567890'),
        type: Generic.name,
      },
      {
        id: expect.any(String),
        name: 'Lingerie 1',
        description: 'Description 1',
        barcode: new Barcode('1234567890'),
        type: Lingerie.name,
      },
    ]);
  });
});
