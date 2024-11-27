export class InvalidAttribute {
  constructor(
    public property: string,
    public value: string,
    public className: string,
    public message: string,
  ) {}
}
