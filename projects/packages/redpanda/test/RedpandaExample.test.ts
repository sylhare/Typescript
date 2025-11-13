import { TProducer, TConsumer } from '@sylhare/kafka';
import { RedpandaConfig } from '../src/RedpandaConfig';

describe('Redpanda package', () => {
  const topic = 'example-topic';

  describe('Configuration', () => {
    it('creates RedpandaConfig with default broker', () => {
      const config = new RedpandaConfig('test-client', {});
      expect(config.clientId).toBe('test-client');
      expect(config.brokers).toContain('localhost:19092');
    });

    it('creates RedpandaConfig from environment variable', () => {
      const config = new RedpandaConfig('test-client', {
        REDPANDA_BOOTSTRAP_SERVERS: 'redpanda1:9092,redpanda2:9092'
      });
      expect(config.brokers).toEqual(['redpanda1:9092', 'redpanda2:9092']);
    });

    it('creates RedpandaConfig with explicit brokers', () => {
      const config = RedpandaConfig.withBrokers('test-client', ['custom:9092']);
      expect(config.brokers).toEqual(['custom:9092']);
    });
  });

  describe('Producer and Consumer creation', () => {
    const config = new RedpandaConfig('test-client', {});

    it('can create producer with RedpandaConfig', () => {
      const producer = new TProducer(config, { topic });
      expect(producer).toBeInstanceOf(TProducer);
    });

    it('can create consumer with RedpandaConfig', () => {
      const consumer = new TConsumer(config, { topic });
      expect(consumer).toBeInstanceOf(TConsumer);
    });
  });
});

