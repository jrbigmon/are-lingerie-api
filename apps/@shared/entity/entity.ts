export abstract class Entity {
  constructor(protected readonly id: string) {}

  abstract isValid(): boolean;
}
