export type SeaCreature = { emoji: string, deadly: boolean };

export const deadliestCreature: SeaCreature = { emoji: '🦐', deadly: true };

export const sea: SeaCreature[] = [
  deadliestCreature,
  { emoji: '🐡', deadly: false },
  { emoji: '🐠', deadly: false },
  { emoji: '🦈', deadly: false },
  { emoji: '🦀', deadly: false },
];
