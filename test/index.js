/* global it,describe */
import {
  Unit,
  compareIdentifiers,
  generateIdentifier,
  apply,
  Operation,
  stateToString,
  StatefullIdentifierGenerator
} from '../index';
import { assert } from 'chai';

describe('', () => {

  describe('generate identifier', () => {

    it('should generate a value', () => {
      assert.isNotNull(generateIdentifier());
    });

    it('should generate unique values', () => {

      assert.notEqual(
        generateIdentifier(1),
        generateIdentifier(2)
      );
    });

    it('should generate unique values with letters', () => {

      assert.notEqual(
        generateIdentifier(1, 'a'),
        generateIdentifier(1, 'b')
      );
    });

    describe('statefull identifier generator', () => {

      it('should generate unique values', () => {
        const generator = new StatefullIdentifierGenerator();

        const a = generator.generate();
        const b = generator.generate();
        const c = generator.generate();

        assert.notEqual(a, b);
        assert.notEqual(a, c);
        assert.notEqual(b, c);
      });

    });

  });

  describe('compare identifier', () => {

    it('0a should equal 0a', () => {
      assert.equal(compareIdentifiers('0a', '0a'), 0);
    });

    it('1a should be greater than 0a', () => {
      assert.equal(compareIdentifiers('1a', '0a'), 1);
    });

    it('0a should be lower than 1a', () => {
      assert.equal(compareIdentifiers('0a', '1a'), -1);
    });

    it('1b should be greater than 1a', () => {
      assert.equal(compareIdentifiers('1b', '1a'), 1);
    });

    it('1a should be lower than 1b', () => {
      assert.equal(compareIdentifiers('1a', '1b'), -1);
    });
  });

  describe('apply operation', () => {

    describe('add', () => {

      it('should apply in empty state', () => {
        const generator = new StatefullIdentifierGenerator();
        const unit = new Unit.create(generator, 'a');

        const op = new Operation('add', unit);

        const state = [];

        const newState = apply(state, op);

        assert.equal([ 'a' ], stateToString(newState));
      });

      it('should apply with no after', () => {
        const generator = new StatefullIdentifierGenerator();
        const unitA = new Unit.create(generator, 'a');
        const unitB = new Unit.create(generator, 'b');

        const op = new Operation('add', unitB);

        const state = [ unitA ];

        const newState = apply(state, op);

        assert.equal('ba', stateToString(newState));
      });

      it('should apply b after a', () => {
        const generator = new StatefullIdentifierGenerator();
        const unitA = new Unit.create(generator, 'a');
        const unitB = new Unit.create(generator, 'b');

        const op = new Operation('add', unitB, unitA);

        const state = [ unitA ];

        const newState = apply(state, op);

        assert.equal('ab', stateToString(newState));
      });

      it('should apply c after ab', () => {
        const generator = new StatefullIdentifierGenerator();
        const unitA = new Unit.create(generator, 'a');
        const unitB = new Unit.create(generator, 'b');
        const unitC = new Unit.create(generator, 'c');

        const op = new Operation('add', unitC, unitB);

        const state = [ unitA, unitB ];

        const newState = apply(state, op);

        assert.equal('abc', stateToString(newState));
      });

      it('should apply b after a', () => {
        const generator = new StatefullIdentifierGenerator();
        const unitA = new Unit.create(generator, 'a');
        const unitB = new Unit.create(generator, 'b');
        const unitC = new Unit.create(generator, 'c');

        const op = new Operation('add', unitB, unitA);

        const state = [ unitA, unitC ];

        const newState = apply(state, op);

        assert.equal('abc', stateToString(newState));
      });
    });

  });

});
