import { Consumer, ConsumerRunConfig, EachMessagePayload, Kafka } from 'kafkajs';
import { SimpleConsumer } from './TKafkaFactory';
import { TKafkaConfig } from './TKafkaConfig';

export interface TConsumerConfiguration {
  name?: string;
  topic: string;
  heartbeatIntervalMs?: number;
  sessionTimeoutMs?: number;
  autoCommitIntervalMs?: number;
  autoCommitThresholdLimit?: number;
}

export class TConsumer implements SimpleConsumer {
  private readonly consumer: Consumer;

  constructor(
    kafkaConfig: TKafkaConfig,
    protected readonly config: TConsumerConfiguration,
  ) {
    const groupId = `${this.config.name ?? 'consumer'}.${this.config.topic}`;
    this.consumer = new Kafka(kafkaConfig).consumer({
      groupId,
      heartbeatInterval: this.config.heartbeatIntervalMs,
      sessionTimeout: this.config.sessionTimeoutMs,
    });
  }

  messageHandler(payload: EachMessagePayload): Promise<void> {
    return Promise.resolve();
  }

  consumerRunConfig(): ConsumerRunConfig {
    return {
      autoCommitInterval: this.config.autoCommitIntervalMs,
      autoCommitThreshold: this.config.autoCommitThresholdLimit,
      eachMessage: this.messageHandler.bind(this)
    };
  }

  connect(): Promise<void> {
    return this.consumer.connect()
      .then(() => this.consumer.subscribe({ topic: this.config.topic }))
      .then(() => this.consumer.run(this.consumerRunConfig()))
      .catch(e => console.log(`Can't connect ${e}`));
  }

  disconnect(): Promise<void> {
    return this.consumer.disconnect()
      .catch(e => console.log(`Error on disconnect ${e}`));
  }
}
