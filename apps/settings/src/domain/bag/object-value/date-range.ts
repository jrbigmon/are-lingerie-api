export class DateRange {
  private dateOfReceipt: Date;
  private deliveryDate: Date;

  constructor(props: { dateOfReceipt: Date; deliveryDate: Date }) {
    this.dateOfReceipt = props.dateOfReceipt;
    this.deliveryDate = props.deliveryDate;
    this.isValid();
  }

  getDateOfReceipt(): Date {
    return this.dateOfReceipt;
  }

  getDeliveryDate(): Date {
    return this.deliveryDate;
  }

  isValid() {
    if (!this.dateOfReceipt) {
      throw new Error('Date of receipt is required');
    }

    if (!this.deliveryDate) {
      throw new Error('Delivery date is required');
    }

    if (this.dateOfReceipt > this.deliveryDate) {
      throw new Error('Date of receipt cannot be after delivery date');
    }
  }
}
