export function returnAnything<T>(arg: T): T {
  return arg;
}

export interface Walking<T> {
  walk: (arg: T) => T;
}

export interface Sprinter {
  sprint: (distance: number) => number;
}

export function walkLap<R, T extends Walking<R>>(walker: T, distance: R): R {
  return walker.walk(distance);
}

export function testLap<T extends Sprinter>(genericSprinter: T): number {
  return genericSprinter.sprint(10);
}

export class Biped<T> implements Walking<T>, Sprinter {
  walk(arg: T): T {
    return arg;
  }

  sprint(distance: number): number {
    return distance;
  }
}

export class Human extends Biped<string> {
  name: string = 'Human';
  talk(): string {
    return 'Hello';
  }
}

export class WalkingPotato extends Biped<string> {
  sleeps(): string {
    return 'zzz';
  }
}

function isHuman(biped: Human | WalkingPotato): biped is Human {
  return (biped as Human).talk !== undefined;
}

export function act(biped: Human | WalkingPotato): string {
  if (isHuman(biped)) {
    return biped.talk();
  } else {
    return biped.sleeps();
  }
}