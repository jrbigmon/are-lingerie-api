import { BaseError } from './base-error';

export class InvalidAttribute extends BaseError {
  public statusCode: 400;

  constructor(
    public property: string,
    public value: any,
    className: string,
    message: string[],
  ) {
    super(className, message);
  }
}
