export type SeaCreature = { fish: string, deadly: boolean };

export const deadliestCreature: SeaCreature = { fish: '🦐', deadly: true };

export const sea: SeaCreature[] = [
  deadliestCreature,
  { fish: '🐡', deadly: false },
  { fish: '🐠', deadly: false },
  { fish: '🦈', deadly: false },
  { fish: '🦀', deadly: false },
];
