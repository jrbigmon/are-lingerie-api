import { generateUUID } from '../../../../../@shared/util/generateUUID';
import { Lingerie, LingerieProps } from '../entity/lingerie/lingerie';

export function createProductFactory() {
  return {
    createLingerie(input: Omit<LingerieProps, 'id'>): Lingerie {
      const id = generateUUID();
      return new Lingerie({ id, ...input });
    },
  };
}
