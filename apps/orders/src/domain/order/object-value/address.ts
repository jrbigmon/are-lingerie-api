import { ObjectValue } from '../../../../../@shared/object-value/object-value';

export interface AddressProps {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export class Address extends ObjectValue {
  private street: string;
  private city: string;
  private state: string;
  private zipCode: string;
  private country: string;

  constructor({ street, city, state, zipCode, country }: AddressProps) {
    super();
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.country = country;

    this.isValid();
  }

  isValid(): boolean {
    return true;
  }

  getStreet(): string {
    return this.street;
  }

  getCity(): string {
    return this.city;
  }

  getState(): string {
    return this.state;
  }

  getZipCode(): string {
    return this.zipCode;
  }

  getCountry(): string {
    return this.country;
  }
}
