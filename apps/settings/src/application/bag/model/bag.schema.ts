import { Schema } from 'mongoose';

export const BagSchema = new Schema({
  id: Schema.ObjectId,
  description: String,
  dateOfReceipt: Date,
  deliveryDate: Date,
});
