export interface FindProductOutput {
  id: string;
  name: string;
  description: string;
  barcode: string;
  sellingPrice: number;
  purchasePrice: number;
  percentOfDiscount: number;
  originalProductId: string;
}
