import { TConsumerConfiguration } from './TConsumer';
import { TProducerConfiguration } from './TProducer';

export interface SimpleConsumer {
  connect(): Promise<void>;

  disconnect(): Promise<void>;
}

export interface SimpleProducer {
  connect(): Promise<void>;

  disconnect(): Promise<void>;

  sendMessages(messages: any[]): Promise<void>;
}

export interface TKafkaFactory {
  producer(configuration: TProducerConfiguration): SimpleProducer;

  consumer(configuration: TConsumerConfiguration): SimpleConsumer;
}
