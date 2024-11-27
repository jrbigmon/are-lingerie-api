import { validateSync } from 'class-validator';
import { InvalidAttribute } from '../error/invalid-attribute';

export function validateSyncData(validator: object, className: string) {
  const extractMessages = (constraint: object) => {
    return Object.values(constraint).flatMap((value) => {
      if (typeof value === 'object' && value !== null) {
        return extractMessages(value);
      }
      return value;
    });
  };

  const errors = validateSync(validator, {
    stopAtFirstError: false,
  });

  return errors.map((error) => {
    return new InvalidAttribute(
      error.property,
      error.value,
      className,
      extractMessages(error.constraints),
    );
  });
}
