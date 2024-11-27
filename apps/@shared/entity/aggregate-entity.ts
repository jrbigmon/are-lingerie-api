export abstract class AggregateEntity {
  constructor(protected readonly id: string) {}

  abstract isValid(): boolean;
}
