import { LRUCache, RateLimiter, EventBatchingQueue } from '../../src/tutorial/systemDesign';

/**
 * System Design Coding
 * 
 * PROBLEM:
 * Implement system design components like cache, rate limiter, or event batching queue.
 * Focus on data structure design and algorithm efficiency (concurrency not required).
 * 
 * INCLUDES: LRU Cache (LeetCode 146), sliding-window rate limiter, event batching
 * PATTERN: Hash maps + doubly linked lists, sliding window, batching algorithms
 * TIME COMPLEXITY: O(1) for cache operations, O(1) amortized for rate limiting
 * SPACE COMPLEXITY: O(capacity) for cache, O(users) for rate limiter
 * 
 * System design coding problems for caches, rate limiters, and event queues
 */
describe('System Design Coding', () => {

  describe('LRU Cache', () => {
    it('should work with basic operations', () => {
      const cache = new LRUCache(2);
      cache.put(1, 1);
      cache.put(2, 2);
      expect(cache.get(1)).toBe(1);
      cache.put(3, 3); // evicts key 2
      expect(cache.get(2)).toBe(-1);
      cache.put(4, 4); // evicts key 1
      expect(cache.get(1)).toBe(-1);
      expect(cache.get(3)).toBe(3);
      expect(cache.get(4)).toBe(4);
    });

    it('should handle updates correctly', () => {
      const cache = new LRUCache(2);
      cache.put(1, 1);
      cache.put(2, 2);
      cache.put(1, 10); // update existing key
      expect(cache.get(1)).toBe(10);
      expect(cache.get(2)).toBe(2);
    });

    it('should handle capacity 1', () => {
      const cache = new LRUCache(1);
      cache.put(1, 1);
      expect(cache.get(1)).toBe(1);
      cache.put(2, 2);
      expect(cache.get(1)).toBe(-1);
      expect(cache.get(2)).toBe(2);
    });

    it('should handle get on empty cache', () => {
      const cache = new LRUCache(1);
      expect(cache.get(1)).toBe(-1);
    });

    it('should handle get on non-existent key', () => {
      const cache = new LRUCache(2);
      cache.put(1, 1);
      expect(cache.get(2)).toBe(-1);
    });

    it('should handle zero and negative values', () => {
      const cache = new LRUCache(2);
      cache.put(1, 0);
      cache.put(2, -1);
      expect(cache.get(1)).toBe(0);
      expect(cache.get(2)).toBe(-1);
    });

    it('should maintain order with gets', () => {
      const cache = new LRUCache(2);
      cache.put(1, 1);
      cache.put(2, 2);
      expect(cache.get(1)).toBe(1); // makes 1 most recent
      cache.put(3, 3); // should evict 2, not 1
      expect(cache.get(1)).toBe(1);
      expect(cache.get(2)).toBe(-1);
      expect(cache.get(3)).toBe(3);
    });
  });

  describe('Rate Limiter', () => {
    it('should allow requests within limit', () => {
      const limiter = new RateLimiter(3, 1000); // 3 requests per 1000ms
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(true);
    });

    it('should reject requests over limit', () => {
      const limiter = new RateLimiter(2, 1000); // 2 requests per 1000ms
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(false);
    });

    it('should handle multiple users independently', () => {
      const limiter = new RateLimiter(1, 1000); // 1 request per 1000ms
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user2')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(false);
      expect(limiter.isAllowed('user2')).toBe(false);
    });

    it('should handle edge case with zero limit', () => {
      const limiter = new RateLimiter(0, 1000);
      expect(limiter.isAllowed('user1')).toBe(false);
    });

    it('should handle single request limit', () => {
      const limiter = new RateLimiter(1, 1000);
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(false);
    });

    it('should handle very short time window', () => {
      const limiter = new RateLimiter(5, 1); // 5 requests per 1ms
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(true);
    });

    it('should handle empty user identifier', () => {
      const limiter = new RateLimiter(1, 1000);
      expect(limiter.isAllowed('')).toBe(true);
      expect(limiter.isAllowed('')).toBe(false);
    });

    it('should handle special characters in identifier', () => {
      const limiter = new RateLimiter(1, 1000);
      expect(limiter.isAllowed('user@domain.com')).toBe(true);
      expect(limiter.isAllowed('user@domain.com')).toBe(false);
    });
  });

  describe('Event Batching Queue', () => {
    it('should batch events by size', (done) => {
      const processedBatches: any[][] = [];
      const queue = new EventBatchingQueue(
        3, // batch size
        1000, // timeout
        (batch) => processedBatches.push(batch)
      );

      queue.add({ id: 1, data: 'event1' });
      queue.add({ id: 2, data: 'event2' });
      queue.add({ id: 3, data: 'event3' });

      setTimeout(() => {
        expect(processedBatches).toHaveLength(1);
        expect(processedBatches[0]).toHaveLength(3);
        done();
      }, 100);
    });

    it('should batch events by timeout', (done) => {
      const processedBatches: any[][] = [];
      const queue = new EventBatchingQueue(
        10, // large batch size
        100, // short timeout
        (batch) => processedBatches.push(batch)
      );

      queue.add({ id: 1, data: 'event1' });
      queue.add({ id: 2, data: 'event2' });

      setTimeout(() => {
        expect(processedBatches).toHaveLength(1);
        expect(processedBatches[0]).toHaveLength(2);
        done();
      }, 150);
    });

    it('should handle single event batches', (done) => {
      const processedBatches: any[][] = [];
      const queue = new EventBatchingQueue(
        1, // batch size of 1
        1000,
        (batch) => processedBatches.push(batch)
      );

      queue.add({ id: 1, data: 'event1' });

      setTimeout(() => {
        expect(processedBatches).toHaveLength(1);
        expect(processedBatches[0]).toHaveLength(1);
        done();
      }, 100);
    });

    it('should handle manual flush', () => {
      const processedBatches: any[][] = [];
      const queue = new EventBatchingQueue(
        10, // large batch size
        10000, // long timeout
        (batch) => processedBatches.push(batch)
      );

      queue.add({ id: 1, data: 'event1' });
      queue.add({ id: 2, data: 'event2' });
      queue.flush();

      expect(processedBatches).toHaveLength(1);
      expect(processedBatches[0]).toHaveLength(2);
    });

    it('should handle empty flush', () => {
      const processedBatches: any[][] = [];
      const queue = new EventBatchingQueue(
        5,
        1000,
        (batch) => processedBatches.push(batch)
      );

      queue.flush(); // flush with no events
      expect(processedBatches).toHaveLength(0);
    });

    it('should handle multiple batches', (done) => {
      const processedBatches: any[][] = [];
      const queue = new EventBatchingQueue(
        2,
        1000,
        (batch) => processedBatches.push(batch)
      );

      queue.add({ id: 1 });
      queue.add({ id: 2 }); // triggers first batch
      queue.add({ id: 3 });
      queue.add({ id: 4 }); // triggers second batch

      setTimeout(() => {
        expect(processedBatches).toHaveLength(2);
        expect(processedBatches[0]).toHaveLength(2);
        expect(processedBatches[1]).toHaveLength(2);
        done();
      }, 100);
    });

    it('should handle different event types', (done) => {
      const processedBatches: string[][] = [];
      const queue = new EventBatchingQueue<string>(
        2,
        1000,
        (batch: string[]) => processedBatches.push(batch)
      );

      queue.add('event1');
      queue.add('event2');

      setTimeout(() => {
        expect(processedBatches).toHaveLength(1);
        expect(processedBatches[0]).toEqual(['event1', 'event2']);
        done();
      }, 100);
    });
  });
});
