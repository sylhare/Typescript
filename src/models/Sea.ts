export type SeaCreature = { emoji: string, deadly: boolean, type: string };
export type SortedCreatures = { deadly: SeaCreature[], safe: SeaCreature[] };
export type SeaCreatureTyped = {
  type: SeaCreatureType,
  emoji: string,
  deadly: boolean,
};
export enum SeaCreatureType {
  CRUSTACEAN = 'crustacean',
  FISH = 'fish',
  SHARK = 'shark',
}

export const deadliestCreature: SeaCreature = { emoji: '🦐', deadly: true, type: 'crustacean' };

export const sea: SeaCreature[] = [
  deadliestCreature,
  { emoji: '🐡', deadly: false, type: 'fish' },
  { emoji: '🐠', deadly: false, type: 'fish' },
  { emoji: '🦈', deadly: false, type: 'shark' },
  { emoji: '🦀', deadly: false, type: 'crustacean' },
];
