export class BaseError {
  public isClientError: boolean = true;

  public timestamp: Date;

  constructor(
    public className: string,
    public message: string | string[],
  ) {
    this.timestamp = new Date();
  }
}
