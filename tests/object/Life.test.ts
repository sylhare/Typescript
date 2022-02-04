import { fruitBasket, people, workTripHoliday } from '../../src/models/Life';

describe('Life', () => {

  it('should be mapped to a name', () =>
    expect(workTripHoliday.map(it => it.name).join('-')).toEqual('🧳-✈️-🌴'));

  it('life works in mysterious ways', () =>
    expect(people.map(it => ({ ...it, hobby: workTripHoliday }))).toMatchObject(people));

  it('when life gives you a fruit basket ...', () =>
    expect(Object.entries(fruitBasket).map(([key, value]) => ({ name: key, emoji: value }))).toEqual([
      { name: 'apple', emoji: '🍎' },
      { name: 'banana' , emoji: '🍌' },
      { name: 'kiwi' , emoji: '🥝' },
    ])
  );
});
