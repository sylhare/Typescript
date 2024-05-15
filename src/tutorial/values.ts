export function valuesOf<O extends object>(obj: O): (O[keyof O])[] {
  const values: (O[keyof O])[] = [];
  let key: keyof typeof obj;
  for (key in obj) {
    values.push(obj[key]);
  }
  return values;
}

export function valuesFromKeys<O extends object>(obj: O, keys: string[]): O[keyof O][] {
  const values: O[keyof O][] = [];
  const objectKeys = keys.filter(key => key in obj) as unknown as (keyof O)[];

  for (const key of objectKeys) {
    values.push(obj[key]);
  }

  return values;
}

export function valuesFrom<O extends object>(obj: O): O[keyof O][] {
  const values: O[keyof O][] = [];
  for (const [key, value] of Object.entries(obj)) {
    console.log(key, value);
    values.push(value);
  }
  return values;
}