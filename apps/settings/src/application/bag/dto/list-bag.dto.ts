export interface ListBagInput {}

export type ListBagOutput = {
  id: string;
  description: string;
  dateOfReceipt: Date;
  deliveryDate: Date;
}[];
