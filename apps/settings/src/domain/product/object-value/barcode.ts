export class Barcode {
  constructor(private code: string) {
    this.isValid();
  }

  getCode(): string {
    return this.code;
  }

  setCode(code: string) {
    this.code = code;
  }

  isValid() {
    if (!this.code?.trim()) {
      throw new Error('Barcode is required');
    }

    if (this.code.length < 6) {
      throw new Error('Barcode must be at least 6 characters');
    }
  }
}
