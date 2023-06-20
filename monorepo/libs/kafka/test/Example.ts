import { SimpleConsumer, SimpleProducer, TKafkaFactory } from '../../src/kafka/TKafkaFactory';
import { TKafkaConfig } from '../../src/kafka/TKafkaConfig';
import { TConsumer, TConsumerConfiguration } from '../../src/kafka/TConsumer';
import { TProducer, TProducerConfiguration } from '../../src/kafka/TProducer';
import { Message } from 'kafkajs';

export class ExampleFactory implements TKafkaFactory {
  readonly kafkaConfig = new TKafkaConfig('example', process.env);

  consumer(configuration: TConsumerConfiguration): SimpleConsumer {
    return new TConsumer(this.kafkaConfig, configuration);
  }

  producer(configuration: TProducerConfiguration): SimpleProducer {
    return new TProducer(this.kafkaConfig, configuration);
  }
}

export class ExampleService {
  isConnected: boolean;

  constructor(readonly producer: SimpleProducer, readonly consumer: SimpleConsumer) {
    this.isConnected = false;
  }

  start(): Promise<void> {
    return this.producer.connect().then(() => this.consumer.connect()).then(() => {this.isConnected = true; });
  }

  send(messages: Message[]) {
    return this.producer.sendMessages(messages);
  }

  stop(): Promise<void> {
    return this.consumer.disconnect().then(() => this.producer.disconnect()).then(() => {this.isConnected = false; });
  }
}
