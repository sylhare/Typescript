/**
 * LRU Cache
 */
export class LRUCache {
  private readonly capacity: number;
  private cache: Map<number, number>;
  private readonly usage: Map<number, number>; // key -> last access time
  private accessCounter: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
    this.usage = new Map();
    this.accessCounter = 0;
  }

  /**
   * Get value by key
   * @param key Key to retrieve
   * @returns Value if exists, -1 otherwise
   */
  get(key: number): number {
    if (!this.cache.has(key)) {
      return -1;
    }
    
    // Update access time to mark as recently used
    this.usage.set(key, ++this.accessCounter);
    return this.cache.get(key)!;
  }

  /**
   * Put key-value pair
   * @param key Key to store
   * @param value Value to store
   */
  put(key: number, value: number): void {
    // If key already exists, update value and access time
    if (this.cache.has(key)) {
      this.cache.set(key, value);
      this.usage.set(key, ++this.accessCounter);
      return;
    }

    // If at capacity, evict least recently used
    if (this.cache.size >= this.capacity) {
      let lruKey = -1;
      let lruTime = Infinity;
      
      // Find the least recently used key
      for (const [k, accessTime] of this.usage) {
        if (accessTime < lruTime) {
          lruTime = accessTime;
          lruKey = k;
        }
      }
      
      // Remove least recently used
      if (lruKey !== -1) {
        this.cache.delete(lruKey);
        this.usage.delete(lruKey);
      }
    }

    // Add new key-value pair
    this.cache.set(key, value);
    this.usage.set(key, ++this.accessCounter);
  }
}

/**
 * Rate Limiter
 */
export class RateLimiter {
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private requests: Map<string, number[]>; // identifier -> array of timestamps

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map();
  }

  /**
   * Check if request is allowed
   * @param identifier User/client identifier
   * @returns True if request allowed, false if rate limited
   */
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Get or initialize request timestamps for this identifier
    if (!this.requests.has(identifier)) {
      this.requests.set(identifier, []);
    }

    const userRequests = this.requests.get(identifier)!;

    // Remove old requests outside the window
    while (userRequests.length > 0 && userRequests[0] <= windowStart) {
      userRequests.shift();
    }

    // Check if we're at the limit
    if (userRequests.length >= this.maxRequests) {
      return false;
    }

    // Add current request timestamp
    userRequests.push(now);
    return true;
  }
}

/**
 * Event Batching Queue
 */
export class EventBatchingQueue<T> {
  private readonly batchSize: number;
  private readonly timeoutMs: number;
  private readonly processBatch: (batch: T[]) => void;
  private currentBatch: T[];
  private timer: NodeJS.Timeout | null;

  constructor(batchSize: number, timeoutMs: number, processBatch: (batch: T[]) => void) {
    this.batchSize = batchSize;
    this.timeoutMs = timeoutMs;
    this.processBatch = processBatch;
    this.currentBatch = [];
    this.timer = null;
  }

  /**
   * Add event to queue
   * @param event Event to add
   */
  add(event: T): void {
    // Add event to current batch
    this.currentBatch.push(event);

    // Set timeout for time-based flushing (if not already set)
    if (this.timer === null && this.timeoutMs > 0) {
      this.timer = setTimeout(() => {
        this.flush();
      }, this.timeoutMs);
    }

    // Flush batch if size limit reached
    if (this.currentBatch.length >= this.batchSize) {
      this.flush();
    }
  }

  /**
   * Manually flush current batch
   */
  flush(): void {
    // Clear timeout if exists
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    // Process current batch if not empty
    if (this.currentBatch.length > 0) {
      const batchToProcess = [...this.currentBatch];
      this.currentBatch = [];
      this.processBatch(batchToProcess);
    }
  }
}