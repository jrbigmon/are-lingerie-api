export class Barcode {
  constructor(private code: string) {}
  getCode(): string {
    return this.code;
  }

  setCode(code: string) {
    this.code = code;
  }
}
