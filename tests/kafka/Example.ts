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
