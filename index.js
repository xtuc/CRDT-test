/* @flow */

import { generateIdentifier } from './src/Identifier';
import { Unit } from './src/Unit';
import { Operation, apply } from './src/Operation';
// import { stateToString } from './src/Util';

export class StatefullIdentifierGenerator {
  _number: number;
  _letter: string;

  constructor(startNumber: number = 0, startLetter: string = 'a') {
    this._number = startNumber;
    this._letter = startLetter;
  }

  generate(): Identifier {
    const next = generateIdentifier(this._number, this._letter);

    const [ number, letter ] = next;

    this._number = number;
    this._letter = letter;

    return next.join('');
  }
}

const generator = new StatefullIdentifierGenerator();
const unitA = new Unit.create(generator, 'a');
const unitB = new Unit.create(generator, 'b');
const unitC = new Unit.create(generator, 'c');

const op = new Operation('add', unitB, unitA);

const state = [ unitA, unitC ];

const newState = apply(state, op);
console.log(newState);
