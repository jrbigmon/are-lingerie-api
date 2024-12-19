export abstract class BaseError {
  public isClientError: boolean = true;
  public timestamp: Date = new Date();

  constructor(
    public className: string,
    public message: string | string[],
  ) {}
}
