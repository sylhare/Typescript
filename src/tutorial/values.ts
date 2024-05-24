export function valuesOf<T extends object>(obj: T): (T[keyof T])[] {
  const values: (T[keyof T])[] = [];
  let key: keyof typeof obj;
  for (key in obj) {
    values.push(obj[key]);
  }
  return values;
}

export function valuesFromKeys<T extends object>(obj: T, keys: string[]): T[keyof T][] {
  const values: T[keyof T][] = [];
  const objectKeys = keys.filter(key => key in obj) as unknown as (keyof T)[];

  for (const key of objectKeys) {
    values.push(obj[key]);
  }

  return values;
}

export function valuesFrom<T extends object>(obj: T): T[keyof T][] {
  const values: T[keyof T][] = [];
  for (const [, value] of Object.entries(obj)) {
    values.push(value);
  }
  return values;
}