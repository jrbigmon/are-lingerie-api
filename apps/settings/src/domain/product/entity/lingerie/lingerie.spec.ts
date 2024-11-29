import { InvalidAttribute } from '../../../../../../@shared/error/invalid-attribute';
import { Barcode } from '../../object-value/barcode';
import { Lingerie, LingerieSize } from './lingerie';

describe('Lingerie entity', () => {
  it('should be create a new lingerie entity', () => {
    const lingerie = new Lingerie({
      id: '123',
      name: 'Lingerie 1',
      description: 'Description 1',
      barcode: new Barcode('1234567890'),
      size: LingerieSize.SMALL,
    });

    const lingerieJSON = lingerie.toJSON();

    expect(lingerieJSON.id).toEqual('123');
    expect(lingerieJSON.name).toEqual('Lingerie 1');
    expect(lingerieJSON.description).toEqual('Description 1');
    expect(lingerieJSON.barcode.getCode()).toEqual('1234567890');
    expect(lingerieJSON.size).toEqual(LingerieSize.SMALL);
  });

  it('should be not create a new lingerie entity when size is null', () => {
    let errors = undefined;
    try {
      new Lingerie({
        id: '123',
        name: 'Lingerie 1',
        description: 'Description 1',
        barcode: new Barcode('1234567890'),
        size: null,
      });
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toHaveLength(1);
      expect(errors[0] instanceof InvalidAttribute).toBeTruthy();
      expect(errors[0].property).toEqual('size');
      expect(errors[0].value).toBeNull();
      expect(errors[0].className).toEqual(Lingerie.name);
      expect(errors[0].message).toMatchObject(['Product size is required']);
    }
  });
});
