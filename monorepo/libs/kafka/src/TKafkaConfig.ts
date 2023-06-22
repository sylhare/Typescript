import { KafkaConfig } from 'kafkajs';

export class TKafkaConfig implements KafkaConfig {
  readonly brokers: string[];
  readonly clientId: string;

  constructor(clientId: string, env: any) {
    this.brokers = env.KAFKA_BOOTSTRAP_SERVERS?.split(',') || ['localhost:9092'];
    this.clientId = clientId;
  }
}
