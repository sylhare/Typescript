import { deadliestCreature, sea, SeaCreature } from '../../src/models/Sea';

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
      const reducedCreatures = sea.reduce((result, creature) => {
        creature.deadly ? result.deadly.push(creature) : result.safe.push(creature);
        return result;
      }, { deadly: [] as SeaCreature[], safe: [] as SeaCreature[] });

      expect(reducedCreatures).toMatchObject({ deadly: [deadliestCreature] });
      expect(reducedCreatures.safe.length).toEqual(sea.length - 1);
    });
  });
});
