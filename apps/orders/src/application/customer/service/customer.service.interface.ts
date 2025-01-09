import {
  FindOrCreateCustomerInput,
  FindOrCreateCustomerOutput,
} from '../dto/find-or-create-customer.dto';

export interface CustomerServiceInterface {
  findOrCreate(
    input: FindOrCreateCustomerInput,
  ): Promise<FindOrCreateCustomerOutput>;
}
