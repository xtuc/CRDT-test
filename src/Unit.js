/* @flow */

export class Unit {
  identifier: Identifier;
  value: string;

  static create(generator, value: string) {
    return new Unit(generator.generate(), value);
  }

  constructor(identifier: Identifier, value: string) {
    (this: UnitType);

    this.identifier = identifier;
    this.value = value;
  }

  getIdentifier(): Identifier {
    return this.identifier;
  }

  getValue(): string {
    return this.value;
  }
}
