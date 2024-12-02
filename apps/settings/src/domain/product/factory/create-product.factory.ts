import { generateUUID } from '../../../../../@shared/util/generateUUID';
import { Generic } from '../entity/generic/generic';
import { Lingerie, LingerieSize } from '../entity/lingerie/lingerie';
import { Barcode } from '../object-value/barcode';

export type CreateLingerieInput = {
  name: string;
  description: string;
  barcode: string;
  size: LingerieSize;
};

export type CreateGenericInput = {
  name: string;
  description: string;
  barcode: string;
};

export function createProductFactory() {
  return {
    createLingerie(input: CreateLingerieInput): Lingerie {
      const id = generateUUID();

      const { name, barcode, description, size } = input;

      return new Lingerie({
        id,
        name,
        description,
        barcode: new Barcode(barcode),
        size,
      });
    },

    createGeneric(input: CreateGenericInput): Generic {
      const id = generateUUID();

      const { name, barcode, description } = input;

      return new Generic({
        id,
        name,
        description,
        barcode: new Barcode(barcode),
      });
    },
  };
}
