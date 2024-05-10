export const farm = {
  pig: {
    type: 'animal',
    img: '🐖'
  },
  cow: {
    type: 'animal',
    img: '🐄'
  },
  tractor: {
    type: 'building',
    img: '🚜'
  },
  farmer: {
    type: 'human',
    img: '👩‍🌾'
  }
};

export type FruitBasket = { apple: string, banana: string, kiwi: string };
export const fruitBasket = {
  apple: '🍎',
  banana: '🍌',
  kiwi: '🥝',
};

export type Fruit = { name: string, emoji: string };
export const listOfFruits = [
  { name: 'apple', emoji: '🍎' },
  { name: 'banana', emoji: '🍌' },
  { name: 'kiwi', emoji: '🥝' },
];
