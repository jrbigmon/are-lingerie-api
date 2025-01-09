export interface FindOrCreateCustomerInput {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
}

export interface FindOrCreateCustomerOutput {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
}
