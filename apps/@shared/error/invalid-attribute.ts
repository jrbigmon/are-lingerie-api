import { BaseError } from './base-error';

export class InvalidAttribute extends BaseError {
  constructor(
    public property: string,
    public value: any,
    className: string,
    message: string[],
  ) {
    super(className, message);
  }
}
