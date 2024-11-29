import { IsNotEmpty } from 'class-validator';
import { validateSyncData } from '../../../../../@shared/validation/validate-sync-data';
import { InvalidAttribute } from '../../../../../@shared/error/invalid-attribute';
import { ObjectValue } from '../../../../../@shared/object-value/object-value';

export class DateRange extends ObjectValue {
  @IsNotEmpty({ message: 'Bag date of receipt is required' })
  private dateOfReceipt: Date;

  @IsNotEmpty({ message: 'Bag delivery date is required' })
  private deliveryDate: Date;

  constructor(props: { dateOfReceipt: Date; deliveryDate: Date }) {
    super();
    this.dateOfReceipt = props.dateOfReceipt;
    this.deliveryDate = props.deliveryDate;
    this.isValid();
  }

  getDateOfReceipt(): Date {
    return this.dateOfReceipt;
  }

  getDeliveryDate(): Date {
    return this.deliveryDate;
  }

  isValid(): boolean {
    const errors = validateSyncData(this, DateRange.name);

    if (this.dateOfReceipt > this.deliveryDate) {
      const error = new InvalidAttribute(
        'dateOfReceipt',
        this.dateOfReceipt?.toISOString(),
        DateRange.name,
        ['Date of receipt cannot be after delivery date'],
      );

      errors.push(error);
    }

    if (errors.length) {
      throw errors;
    }

    return true;
  }
}
