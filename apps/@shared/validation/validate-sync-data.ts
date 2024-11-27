import { validateSync } from 'class-validator';
import { InvalidAttribute } from '../error/invalid-attribute';

export function validateSyncData(validator: Object) {
  const errors = validateSync(validator, {
    stopAtFirstError: false,
  });

  return errors.map((error) => {
    console.error(error);
    new InvalidAttribute(error.property, error.value, 'test', 'test');
  });
}
