/* @flow */

import { compareIdentifiers } from './Identifier';

export class Operation {
  op: Object;
  unit: Object;
  after: ?Object;

  constructor(op: Object, unit: Object, after: ?Object) {
    this.op = op;
    this.unit = unit;
    this.after = after;
  }
}

export function apply(state: [UnitType], op: Operation) {
  if (op.op === 'add') {

    if (state.length === 0) {
      return [ op.unit ];
    }

    if (!op.after) {
      return [ op.unit, ...state ];
    }

    const lIdentifier: Identifier = op.after.getIdentifier();

    return state.reduce((acc, el) => {
      const rIdentifier: Identifier = el.getIdentifier();

      acc.push(el);

      if (compareIdentifiers(lIdentifier, rIdentifier) === 0) {
        acc.push(op.unit);
      }

      return acc;
    }, []);
  }

  return [];
}
