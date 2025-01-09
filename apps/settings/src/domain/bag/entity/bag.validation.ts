import { IsNotEmpty } from 'class-validator';
import { Bag, BagProps } from './bag';
import { DateRange } from '../object-value/date-range';

export class BagValidation {
  @IsNotEmpty({ message: 'Bag id is required' })
  id: string;

  @IsNotEmpty({ message: 'Bag description is required' })
  description: string;

  @IsNotEmpty({ message: 'Bag date range is required' })
  dateRange: DateRange;

  constructor(bag: Bag) {
    this.id = bag.getId();
    this.description = bag.getDescription();
    this.dateRange = bag.getDateRange();
  }
}
