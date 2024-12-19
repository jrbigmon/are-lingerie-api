export interface CreateProductInput {
  bagId?: string;
  name: string;
  description: string;
  barcode: string;
  type?: string;
  size?: string;
}

export interface CreateProductOutput {
  id: string;
  name: string;
  description: string;
  barcode: string;
  type: string;
  size: string | null;
}
