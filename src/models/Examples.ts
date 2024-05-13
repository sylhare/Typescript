export const workTripHoliday = [{ name: '🧳' }, { name: '✈️' }, { name: '🌴' }];

export const people = [
  {
    person: '👩‍🔬',
    type: 'scientist',
    tools: ['🔬', '🧪', '⚗️']
  },
  {
    person: '👩‍🔧',
    type: 'worker',
    tools: ['🔨', '🔧', '🔩', '⚙️']
  },
  {
    person: '👩‍🍳',
    type: 'cook',
    tools: ['🍳']
  }
];

export interface Person {
  name: string;
  age: number;
}
