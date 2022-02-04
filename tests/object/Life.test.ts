import { fruitBasket, listOfFruits, people, workTripHoliday } from '../../src/models/Life';

describe('Life', () => {

  it('should be mapped to a name', () =>
    expect(workTripHoliday.map(it => it.name).join('-')).toEqual('🧳-✈️-🌴'));

  it('life works in mysterious ways', () =>
    expect(people.map(it => ({ ...it, hobby: workTripHoliday }))).toMatchObject(people));

  it('takes a fruit basket into a list of fruits', () =>
    expect(Object.entries(fruitBasket).map(([key, value]) => ({ name: key, emoji: value }))).toEqual(listOfFruits));

  it('takes a list of fruits into a fruit basket', () =>
    expect(Object.fromEntries(listOfFruits.map(it => [it.name, it.emoji]))).toEqual(fruitBasket)
  );
});
