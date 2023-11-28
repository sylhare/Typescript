import {
  deadliestCreature,
  sea,
  SeaCreature,
  SeaCreatureType,
  SeaCreatureTyped,
  SortedCreatures
} from '../../src/models/Sea';

describe('Sea creatures', () => {

  describe('Filtering creatures', () => {
    it('filters not deadly out', () => {
      const deadlyCreatures = sea.filter(creature => creature.deadly);
      expect(deadlyCreatures.length).toBe(1);
      expect(deadlyCreatures[0]).toBe(deadliestCreature);
    });
  });

  describe('Mapping creatures', () => {
    it('maps the creatures to their deadliest instincts', () => {
      const creatures = sea.map(creature => ({
        ...creature,
        type: `${creature.deadly ? 'Deadly' : 'Chill'} creature`
      }));
      creatures.forEach(creature => expect(creature.type).toBeDefined());
    });
  });

  describe('Reducing creatures', () => {
    it('reduces to default', () => {
      const deadlyCreature = sea.reduce((result, _) => result, deadliestCreature);
      expect(deadlyCreature).toEqual(deadliestCreature);
    });

    it('reduces to default no initial value', () => {
      const deadlyCreature = sea.reduce((result, _) => result);
      expect(deadlyCreature).toBe(sea[0]);
    });

    it('reduces to last', () => {
      const deadlyCreature = sea.reduce((_: SeaCreature, current: SeaCreature) => current);
      expect(deadlyCreature).toBe(sea[sea.length - 1]);
    });

    it('reduces not deadly out', () => {
      const deadlyCreatures = sea.reduce((sortedCreatures: SeaCreature[], currentCreature) => ([
        ...sortedCreatures,
        ...(currentCreature.deadly ? [currentCreature] : [])
      ]), []);
      expect(deadlyCreatures.length).toBe(1);
      expect(deadlyCreatures[0]).toBe(deadliestCreature);
    });

    it('has deadly creatures', () => {
      expect(sea.reduce((a, b) => a || b.deadly, false)).toBe(true);
    });

    it('puts creatures in a safe or deadly object', () => {
      const reducedCreatures: SortedCreatures = sea.reduce((result: SortedCreatures, creature) => {
        creature.deadly ? result.deadly.push(creature) : result.safe.push(creature);
        return result;
      }, { deadly: [], safe: [] });

      expect(reducedCreatures).toMatchObject({ deadly: [deadliestCreature] });
      expect(reducedCreatures.safe.length).toEqual(sea.length - 1);
    });

    it('puts creatures in a safe or deadly object in a different way', () => {
      const reducedCreatures = sea.reduce((result, creature) => creature.deadly ?
        { ...result, deadly: [...result.deadly, creature] } :
        { ...result, safe: [...result.safe, creature] },
      { deadly: [] as SeaCreature[], safe: [] as SeaCreature[] });

      expect(reducedCreatures).toMatchObject({ deadly: [deadliestCreature] });
      expect(reducedCreatures.safe.length).toEqual(sea.length - 1);
    });

    it('puts creatures in a safe or deadly object extracted', () => {
      type DeadlySafe = { deadly: SeaCreature[], safe: SeaCreature[] };
      const creatureReducer = (result: DeadlySafe, creature: SeaCreature) => creature.deadly ?
        { ...result, deadly: [...result.deadly, creature] } :
        { ...result, safe: [...result.safe, creature] };

      const reducedCreatures = sea.reduce(creatureReducer, { deadly: [], safe: [] });

      expect(reducedCreatures).toMatchObject({ deadly: [deadliestCreature] });
      expect(reducedCreatures.safe.length).toEqual(sea.length - 1);
    });

    it('groups by type', () => {
      const empty: { [key: string]: SeaCreature[] } = {};
      const groupedCreatures: { [key: string]: SeaCreature[] } = sea.reduce((result, creature) => ({
        ...result,
        [creature.type]: [...(result[creature.type] || []), creature]
      }), empty);

      expect(groupedCreatures).toMatchSnapshot();
      expect(groupedCreatures.shark.length).toEqual(1);
      expect(groupedCreatures).toBeInstanceOf(Object);
    });

    it('groups creatures in a map per type', () => {
      const groupedCreatures = sea.reduce((typedCreatures, creature) =>
        typedCreatures.set(creature.type, [...typedCreatures.get(creature.type) || [], creature]),
      new Map());
      expect(groupedCreatures).toMatchSnapshot();
      expect(groupedCreatures.get('shark').length).toEqual(1);
      expect(groupedCreatures).toBeInstanceOf(Map);
    });
  });
});
