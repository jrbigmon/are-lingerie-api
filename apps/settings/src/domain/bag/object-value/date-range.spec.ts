import { InvalidAttribute } from '../../../../../@shared/error/invalid-attribute';
import { DateRange } from './date-range';

describe('DateRange', () => {
  it('should be instantiate a date range', () => {
    const dateRange = new DateRange({
      dateOfReceipt: new Date('2022-01-01'),
      deliveryDate: new Date('2022-01-15'),
    });

    expect(dateRange.getDateOfReceipt()).toBeInstanceOf(Date);
    expect(dateRange.getDateOfReceipt().toISOString()).toBe(
      '2022-01-01T00:00:00.000Z',
    );

    expect(dateRange.getDeliveryDate()).toBeInstanceOf(Date);
    expect(dateRange.getDeliveryDate().toISOString()).toBe(
      '2022-01-15T00:00:00.000Z',
    );
  });

  it('should be not instantiate a date range when date of receipt is less then delivery date', () => {
    let errors = undefined;

    try {
      new DateRange({
        dateOfReceipt: new Date('2022-01-15'),
        deliveryDate: new Date('2022-01-01'),
      });
    } catch (error) {
      errors = error;
    } finally {
      expect(errors).toBeDefined();
      expect(errors).toMatchObject([
        {
          className: 'DateRange',
          message: ['Date of receipt cannot be after delivery date'],
          property: 'dateOfReceipt',
          timestamp: expect.any(Date),
          value: '2022-01-15T00:00:00.000Z',
        },
      ]);
    }
  });
});
