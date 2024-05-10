import { farm, Fruit, fruitBasket, FruitBasket, listOfFruits } from '../../src/models/Farm';
import { people, workTripHoliday } from '../../src/models/Examples';

describe('Object exploration', () => {
  describe('Farm', () => {
    const entries = Object.entries(farm);

    it('can be viewed as entries', () => {
      expect(entries).toMatchSnapshot();
      expect(entries.length).toEqual(4);
      expect(entries[0].length).toEqual(2);
    });

    it('takes entries back to an object', () => {
      expect(Object.fromEntries(entries)).toEqual(farm);
    });

    it('groups by type', () => {
      const groupedFarm = entries.reduce((result: any, [key, value]) => ({
        ...result,
        [value.type]: [...(result[value.type] || []), ({ ...value, name: key })],
      }), {});
      expect(groupedFarm).toMatchSnapshot();
      expect(groupedFarm.animal.length).toEqual(2);
      expect(groupedFarm.human[0]).toMatchObject({
        ...farm.farmer,
        name: 'farmer',
      });
    });
  });

  describe('Fruit basket', () => {
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

  describe('Other examples', () => {

    it('should be mapped to a name', () =>
      expect(workTripHoliday.map(it => it.name).join('-'))
        .toEqual('🧳-✈️-🌴'));

    it('life works in mysterious ways', () =>
      expect(people.map(it => ({ ...it, hobby: workTripHoliday })))
        .toMatchObject(people));
  });
});