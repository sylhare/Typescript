import { Person } from '../models/Examples';

export type WithProperty<K extends string, V> = {
  [key in K]: V;
};

export function withProperty<O extends object, K extends string, V>(
  obj: O, properties: WithProperty<K, V>,
): O & WithProperty<K, V> {
  return Object.assign(obj, properties);
}

export function getProperty<O extends object, K extends keyof O>(obj: O, key: K): O[K] {
  return obj[key];
}

export function hasProperty<O extends object, K extends string>(obj: O, key: K): boolean {
  return key in obj;
}

export type PrefixedWith<T, P extends string> = {
  [K in keyof T as `${P & string}${string & K}`]: T[K];
};
