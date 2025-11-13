import { TKafkaConfig } from '@sylhare/kafka';

/**
 * Redpanda configuration that extends Kafka config with Redpanda-specific defaults
 */
export class RedpandaConfig extends TKafkaConfig {
  constructor(clientId: string, env: any = process.env) {
    super(clientId, {
      ...env,
      KAFKA_BOOTSTRAP_SERVERS: env.REDPANDA_BOOTSTRAP_SERVERS || env.KAFKA_BOOTSTRAP_SERVERS || 'localhost:19092'
    });
  }
  
  /**
   * Create a RedpandaConfig with explicit broker addresses
   */
  static withBrokers(clientId: string, brokers: string[]): RedpandaConfig {
    const config = new RedpandaConfig(clientId, {});
    (config as any).brokers = brokers;
    return config;
  }
}

