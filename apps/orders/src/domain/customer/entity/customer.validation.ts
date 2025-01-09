import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  ValidateIf,
} from 'class-validator';
import { Customer, CustomerProps } from './customer';

export class CustomerValidation {
  @IsNotEmpty({ message: 'Customer id is required' })
  id: string;

  @IsEmail({}, { message: 'Customer email must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Customer full name is required' })
  fullName: string;

  @ValidateIf((_, value) => value !== undefined && value !== null)
  @IsPhoneNumber(null, {
    message: 'Customer phone must be a valid number',
  })
  phone?: string;

  constructor(customer: Customer) {
    this.id = customer.getId();
    this.email = customer.getEmail();
    this.fullName = customer.getFullName();
    this.phone = customer.getPhone();
  }
}
