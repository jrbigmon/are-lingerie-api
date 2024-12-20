export abstract class BaseError {
  public timestamp: Date = new Date();

  constructor(
    public className: string,
    public message: string | string[],
  ) {}
}
