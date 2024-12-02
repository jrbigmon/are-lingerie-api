export interface CreateEmptyBagInput {
  description: string;
  dateOfReceipt: string;
  deliveryDate: string;
}

export interface CreateEmptyBagOutput {
  id: string;
  description: string;
  dateOfReceipt: Date;
  deliveryDate: Date;
}
