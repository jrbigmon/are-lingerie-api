export interface ListProductInput {}

export type ListProductOutput = {
  id: string;
  name: string;
  description: string;
  barcode: string;
  type: string;
  size: string | null;
}[];
