export class BaseError {
  public timestamp: Date;

  constructor(
    public className: string,
    public message: string | string[],
  ) {
    this.timestamp = new Date();
  }
}
