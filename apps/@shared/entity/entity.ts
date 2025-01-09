export abstract class Entity {
  constructor(protected readonly id: string) {}

  abstract isValid(): boolean;
  abstract toJSON(): unknown;

  public getId() {
    return this.id;
  }
}
