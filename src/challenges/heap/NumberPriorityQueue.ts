import { GenericPriorityQueue, IGenericPriorityQueue } from './GenericPriorityQueue';

export type INumberPriorityQueue = IGenericPriorityQueue<number>
export type NumberQueueFactory = () => INumberPriorityQueue

export class NumberPriorityQueue extends GenericPriorityQueue<number> implements INumberPriorityQueue {
  constructor() {
    super((a, b) => a - b);
  }
}

