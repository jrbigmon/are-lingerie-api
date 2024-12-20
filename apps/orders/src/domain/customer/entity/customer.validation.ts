import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  ValidateIf,
} from 'class-validator';
import { CustomerProps } from './customer';

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

  constructor({ id, email, fullName, phone }: CustomerProps) {
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.phone = phone;
  }
}
