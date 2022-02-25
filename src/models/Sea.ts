export type SeaCreature = { emoji: string, deadly: boolean, type: string };

export const deadliestCreature: SeaCreature = { emoji: '🦐', deadly: true, type: 'crustacean' };

export const sea: SeaCreature[] = [
  deadliestCreature,
  { emoji: '🐡', deadly: false, type: 'fish' },
  { emoji: '🐠', deadly: false, type: 'fish' },
  { emoji: '🦈', deadly: false, type: 'shark' },
  { emoji: '🦀', deadly: false, type: 'crustacean' },
];
