import {
  deadliestCreature, Leviathan,
  sea,
  SeaCreature,
  SeaCreatureType,
  SeaCreatureTyped, SeaMonster, seaMonsters,
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

    it('reduces to only deadly', () => {
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
      const creatureReducer = (result: SortedCreatures, creature: SeaCreature) => creature.deadly ?
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

  describe('With more TS types', () => {
    it('groups an object', () => {
      type GroupedNamedCreatures = {
        crustacean?: NamedSeaCreature[],
        fish?: NamedSeaCreature[],
        shark?: NamedSeaCreature[],
      };
      type NamedSeaCreature = SeaCreatureTyped & { name: string };
      type SeaObject = {
        [key: string]: SeaCreatureTyped
      };
      const emptyGroup: GroupedNamedCreatures = { crustacean: [], fish: [], shark: [] };

      const seaObject = {
        shrimp: { deadly: true, emoji: '🦐', type: 'crustacean' },
        blowfish: { deadly: false, emoji: '🐡', type: 'fish' },
        // ...other objects
      } as SeaObject;

      const grouped: GroupedNamedCreatures = Object.entries(seaObject).reduce((result, [key, value]) => ({
        ...result,
        [value.type]: [...(result[value.type] || []), ({ ...value, name: key })]
      }), emptyGroup);
      expect(grouped).toMatchSnapshot();

      // Without explicit 'any' or 'GroupedNamedCreatures' for the result or the initial value
      // TS7053: Element implicitly has an any type because expression of type SeaCreatureType can't be used to index type '{}'
      // Property [SeaCreatureType.CRUSTACEAN] does not exist on type '{}'
      const namedGrouped = Object.entries(seaObject).reduce((result, [key, value]) => ({
        ...result,
        [value.type]: [...(result[value.type] || []), ({ ...value, name: key })]
      }), {} as GroupedNamedCreatures);
      expect(JSON.stringify(grouped)).toEqual(JSON.stringify(namedGrouped));
    });

    it('groups from a known group', () => {
      type GroupedCreatures = {
        crustacean?: SeaCreature[],
        fish?: SeaCreature[],
        shark?: SeaCreature[],
      };
      type SeaCreatureTyped = {
        type: keyof GroupedCreatures,
        emoji: string,
        deadly: boolean,
      };

      const groupedCreatures = (sea as SeaCreatureTyped[]).reduce((result: GroupedCreatures, creature: SeaCreatureTyped) => ({
        ...result,
        [creature.type]: [...(result[creature.type] || []), creature]
      }), {});

      expect(groupedCreatures).toMatchSnapshot();
      expect(groupedCreatures.shark!.length).toEqual(1);
      expect(groupedCreatures).toBeInstanceOf(Object);
    });

    it('groups by known type', () => {
      type GroupedCreatures = {
        crustacean: SeaCreature[],
        fish: SeaCreature[],
        shark: SeaCreature[],
      };
      const seaTyped: SeaCreatureTyped[] = [
        { emoji: '🦐', deadly: true, type: SeaCreatureType.CRUSTACEAN },
        { emoji: '🐡', deadly: false, type: SeaCreatureType.FISH },
        { emoji: '🐠', deadly: false, type: SeaCreatureType.FISH },
        { emoji: '🦈', deadly: false, type: SeaCreatureType.SHARK },
        { emoji: '🦀', deadly: false, type: SeaCreatureType.CRUSTACEAN },
      ];
      const emptyGroup: GroupedCreatures = { crustacean: [], fish: [], shark: [] };

      // Without casting or using `seaTyped`, the `sea` object would trigger:
      // TS2769: No overload matches this call.
      // Types of parameters creature and currentValue are incompatible.
      // Type 'SeaCreature' is not assignable to type 'SeaCreatureTyped'
      // Types of property 'type' are incompatible.
      // Type 'string' is not assignable to type 'SeaCreatureType'
      const groupedCreatures: GroupedCreatures = seaTyped.reduce((result: GroupedCreatures, creature: SeaCreatureTyped) => ({
        ...result,
        [creature.type]: [...(result[creature.type] || []), creature]
      }), emptyGroup);

      expect(groupedCreatures).toMatchSnapshot();
      expect(groupedCreatures.shark.length).toEqual(1);
      expect(groupedCreatures).toBeInstanceOf(Object);
    });
  });

  describe('With classes', () => {
    it('reduce to deadly', () => {
      const deadlyCreatures: SeaMonster[] = seaMonsters.reduce((sortedCreatures, currentCreature) => ([
        ...sortedCreatures,
        ...(currentCreature.deadly ? [currentCreature] : [])
      ]), [] as SeaMonster[] );
      expect(deadlyCreatures.length).toBe(2);
    });

    it('reduce to leviathan', () => {
      const leviathans = seaMonsters.reduce((sortedCreatures, currentCreature) => ([
        ...sortedCreatures,
        ...(currentCreature instanceof Leviathan ? [currentCreature] : [])
      ]), [] as Leviathan[] );
      expect(leviathans.length).toBe(1);
    });
  });
});
