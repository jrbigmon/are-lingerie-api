import { parsePhoneNumberWithError } from 'libphonenumber-js';
import { Entity } from '../../../../../@shared/entity/entity';
import { validateSyncData } from '../../../../../@shared/validation/validate-sync-data';
import { CustomerValidation } from './customer.validation';

export interface CustomerProps {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
}

export class Customer extends Entity {
  private fullName: string;
  private email: string;
  private phone?: string;

  constructor({ id, fullName, email, phone }: CustomerProps) {
    super(id);
    this.fullName = fullName;
    this.email = email;
    this.phone = this.formatPhoneNumber(phone);
    this.isValid();
  }

  isValid(): boolean {
    const errors = validateSyncData(
      new CustomerValidation(this.toJSON()),
      Customer.name,
    );

    if (errors.length) {
      throw errors;
    }

    return true;
  }

  toJSON() {
    return {
      id: this.id,
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
    };
  }

  private formatPhoneNumber(phone: string): string {
    try {
      if (!phone?.trim()) return '';

      return parsePhoneNumberWithError(phone).format('E.164');
    } catch (_error) {
      return phone;
    }
  }
}
