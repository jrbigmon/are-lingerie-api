import { BagModel } from '../src/application/bag/model/bag.model';
import { ProductModel } from '../src/application/product/model/product.model';
import { Bag } from '../src/domain/bag/entity/bag';
import { DateRange } from '../src/domain/bag/object-value/date-range';
import { Generic } from '../src/domain/product/entity/generic/generic';
import {
  Lingerie,
  LingerieSize,
} from '../src/domain/product/entity/lingerie/lingerie';
import { Barcode } from '../src/domain/product/object-value/barcode';

export const instantiateEntities = () => {
  const initProduct = (model: ProductModel) => {
    const bag = model.bag ? initBag(model.bag) : null;

    if (model.type === Lingerie.name) {
      return new Lingerie({
        id: model.id,
        name: model.name,
        description: model.description,
        barcode: new Barcode(model.barcode),
        size: model.size as LingerieSize,
        bag,
      });
    }

    return new Generic({
      id: model.id,
      name: model.name,
      description: model.description,
      barcode: new Barcode(model.barcode),
      bag,
    });
  };

  const initBag = (model: BagModel): Bag => {
    const bag = new Bag({
      id: model.id,
      description: model.description,
      dateRange: new DateRange({
        dateOfReceipt: model.dateOfReceipt,
        deliveryDate: model.deliveryDate,
      }),
    });

    if (model.products?.length) {
      model.products.forEach((productModel) =>
        bag.addProduct(initProduct(productModel)),
      );
    }

    return bag;
  };

  return {
    initBag,
    initProduct,
  };
};
