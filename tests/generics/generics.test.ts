import { valuesFrom, valuesFromKeys, valuesOf } from '../../src/tutorial/values';
import { fruitBasket } from '../../src/models/Farm';
import { Person } from '../../src/models/Examples';
import { getProperty, hasProperty, PrefixedWith, WithProperty, withProperty } from '../../src/tutorial/properties';
import { act, Human, returnAnything, Sprinter, testLap, WalkingPotato } from '../../src/tutorial/generics';
import { Product } from '../../src/models/Product';

describe('generics', () => {

  describe('Syntax', () => {
    it('works for function with generics', () => {
      expect(returnAnything('🦄')).toEqual('🦄');
    });

    it('works for classes with generics', () => {
      const human = new Human();
      expect(human.walk('10m')).toEqual('10m');
      expect(human.sprint(10)).toEqual(10);
    });

    it('works for interfaces with generics', () => {
      const human = new Human();
      expect(testLap(human)).toEqual(10);
      const lightning: Sprinter = { sprint: (distance: number) => distance * 2 };
      expect(testLap(lightning)).toEqual(20);
    });
  });
});