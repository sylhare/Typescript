import { Fruit, FruitBasket, fruitBasket, listOfFruits, people, workTripHoliday } from '../../src/models/Life';

describe('Life', () => {

  it('should be mapped to a name', () =>
    expect(workTripHoliday.map(it => it.name).join('-'))
      .toEqual('🧳-✈️-🌴'));

  it('life works in mysterious ways', () =>
    expect(people.map(it => ({ ...it, hobby: workTripHoliday })))
      .toMatchObject(people));

  it('takes a fruit basket into a list of fruits', () =>
    expect(Object.entries(fruitBasket).map(([key, value]) => ({ name: key, emoji: value })))
      .toEqual(listOfFruits));

  it('takes a list of fruits into a fruit basket', () =>
    expect(Object.fromEntries(listOfFruits.map(it => [it.name, it.emoji])))
      .toEqual(fruitBasket));

  it('takes a TYPED fruit basket into a TYPED list of fruits', () =>
    expect(Object.entries(fruitBasket as FruitBasket).map(([key, value]) => ({ name: key, emoji: value })))
      .toEqual(listOfFruits as Fruit[]));

  it('takes a TYPED list of fruits into a TYPED fruit basket', () =>
    expect(Object.fromEntries((listOfFruits as Fruit[]).map(it => [it.name, it.emoji])))
      .toEqual(fruitBasket as FruitBasket));
});
