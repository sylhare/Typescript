import { deadliestCreature, sea, SeaCreature } from '../../src/models/Sea';


describe('reduce, map, filter', () => {

  describe('Sea creatures', () => {
    it('filter not deadly out', () => {
      const deadlyCreatures = sea.filter(creature => creature.deadly);
      expect(deadlyCreatures.length).toBe(1);
      expect(deadlyCreatures[0]).toBe(deadliestCreature);
    });

    it('reduce not deadly out', () => {
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
  });
});
