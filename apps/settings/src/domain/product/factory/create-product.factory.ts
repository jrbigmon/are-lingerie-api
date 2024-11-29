import { generateUUID } from '../../../../../@shared/util/generateUUID';
import { Lingerie, LingerieProps } from '../entity/lingerie/lingerie';

export type CreateLingerieInput = Omit<LingerieProps, 'id'>;

export function createProductFactory() {
  return {
    createLingerie(input: CreateLingerieInput): Lingerie {
      const id = generateUUID();
      return new Lingerie({ id, ...input });
    },
  };
}
