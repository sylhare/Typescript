export type SeaCreature = { emoji: string, deadly: boolean, type: string };
export type SortedCreatures = { deadly: SeaCreature[], safe: SeaCreature[] };
export type MarineCreature = {
  type: MarineType,
  emoji: string,
  deadly: boolean,
};
export enum MarineType {
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

export interface SeaMonster {
  deadly: boolean;
}

export class Leviathan implements SeaMonster {
  deadly = true;
}

class Kraken implements SeaMonster {
  deadly = true;
}

export const seaMonsters: SeaMonster[] = [new Leviathan(), new Kraken()];
