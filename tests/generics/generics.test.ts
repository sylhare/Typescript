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

  describe('Keywords', () => {
    it('gets the type of a value', () => {
      const product = new Product();
      expect(product instanceof Product).toBeTruthy();
      const productData = { id: 0, name: 'product' };
      expect(productData instanceof Product).toBeFalsy();
      expect(typeof productData).toEqual('object');
      expect(typeof product).toEqual(typeof productData);
    });

    it('sets the type', () => {
      const human = new Human();
      const walkingPotato = new WalkingPotato();
      expect(act(human)).toEqual('Hello');
      expect(act(walkingPotato)).toEqual('zzz');
    });
  });

  describe('Properties', () => {
    let john: Person;

    beforeEach(() => {
      john = { name: 'John', age: 30 };
    });

    it('gets properties', () => {
      expect(getProperty(john, 'name')).toEqual('John');
    });

    it('has properties', () => {
      expect(hasProperty(john, 'name')).toBeTruthy();
    });

    it('updates properties', () => {
      const age: WithProperty<string, number> = { age: 31 };
      // const age: WithProperty<string, number> = { age: '31' }; // TS2322: Type string is not assignable to type number
      expect(withProperty(john, age)).toEqual({ name: 'John', age: 31 });
      expect(withProperty(john, { yolo: ['🦄'] })).toEqual({ name: 'John', age: 31, yolo: ['🦄'] });
    });

    it('can type', () => {
      const unicorn: Omit<Person, 'age'> = { name: '🦄' }; // TS2322: Type { name: string; age: number; } is not assignable to type Omit<Person, 'age'>
      const product: Pick<Product, 'name'> = new Product({ name: '🦄' });

      interface Named {
        name: string;
      } // TS2345: Argument of type Omit<Person, 'name'> is not assignable to parameter of type Named
      const nameOf: <T extends Named>(obj: T) => string = obj => obj.name;
      expect(nameOf(unicorn)).toEqual('🦄');
      expect(nameOf(product)).toEqual(nameOf(unicorn));
      expect(unicorn).not.toEqual(product);
    });

    it('can create dynamic types', () => {
      type Prefixed<T> = {
        [K in keyof T as `Person_${string & K}`]: T[K];
      };
      const prefixedJohn: Prefixed<Person> = { Person_name: 'John', Person_age: 30 };
      const prefixedWithJohn: PrefixedWith<Person, 'Person_'> = { Person_name: 'John', Person_age: 30 };
      expect(typeof prefixedWithJohn).toEqual(typeof prefixedJohn);
    });
  });
});