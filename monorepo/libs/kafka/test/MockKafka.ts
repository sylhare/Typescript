import { EachMessagePayload, KafkaMessage } from 'kafkajs';
import { SimpleConsumer, SimpleProducer } from '../../src/kafka/TKafkaFactory';

export class MockKafka {
  readonly messages: EachMessagePayload[] = [];
  readonly consumers: MockConsumer[] = [];

  send(messagesSent: EachMessagePayload) {
    this.messages.push(messagesSent);
    this.consumers.forEach(c => c.messageHandler(messagesSent));
  }

  register(consumer: MockConsumer) {
    this.consumers.push(consumer);
  }
}

export class MockProducer implements SimpleProducer {
  constructor(readonly mock: MockKafka, readonly topic: string) {
  }

  sendMessages(messages: any[]): Promise<void> {
    messages.forEach(message => this.mock.send({ topic: this.topic, message, partition: 1, heartbeat: () => Promise.resolve(), pause: jest.fn }));
    return Promise.resolve();
  }

  connect(): Promise<void> {
    return Promise.resolve(undefined);
  }

  disconnect(): Promise<void> {
    return Promise.resolve(undefined);
  }

}

export class MockConsumer implements SimpleConsumer {
  readonly handled: KafkaMessage[] = [];

  messageHandler(payload: EachMessagePayload): Promise<void> {
    this.handled.push(payload.message);
    return Promise.resolve();
  }

  connect(): Promise<void> {
    return Promise.resolve(undefined);
  }

  disconnect(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
