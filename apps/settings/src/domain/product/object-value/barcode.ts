import { IsNotEmpty, MinLength } from 'class-validator';
import { ObjectValue } from '../../../../../@shared/object-value/object-value';
import { validateSyncData } from '../../../../../@shared/validation/validate-sync-data';

export class Barcode extends ObjectValue {
  @IsNotEmpty({ message: 'Product code is required' })
  @MinLength(6, { message: 'Code must be at least 6 characters' })
  private code: string;

  constructor(code: string) {
    super();
    this.code = code;
    this.isValid();
  }

  getCode(): string {
    return this.code;
  }

  setCode(code: string) {
    this.code = code;
  }

  isValid(): boolean {
    const errors = validateSyncData(this, Barcode.name);

    if (errors.length) {
      throw errors;
    }

    return true;
  }
}
