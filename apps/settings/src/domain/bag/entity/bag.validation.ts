import { IsNotEmpty } from 'class-validator';
import { BagProps } from './bag';
import { DateRange } from '../object-value/date-range';

export class BagValidation {
  @IsNotEmpty({ message: 'Bag id is required' })
  id: string;

  @IsNotEmpty({ message: 'Bag description is required' })
  description: string;

  @IsNotEmpty({ message: 'Bag date range is required' })
  dateRange: DateRange;

  constructor({ id, description, dateRange }: BagProps) {
    this.id = id;
    this.description = description;
    this.dateRange = dateRange;
  }
}
