import { Kafka, Message, Producer } from 'kafkajs';
import { SimpleProducer } from './TKafkaFactory';
import { TKafkaConfig } from './TKafkaConfig';

export interface TProducerConfiguration {
  topic: string;
}

export class TProducer implements SimpleProducer {
  private readonly producer: Producer;

  constructor(
    kafkaConfig: TKafkaConfig,
    protected readonly config: TProducerConfiguration,
  ) {
    this.producer = new Kafka(kafkaConfig).producer();
  }

  sendMessages(messages: any[]): Promise<void> {
    return this.send(messages);
  }

  protected send(messages: Message[]): Promise<any> {
    return this.producer.send({ topic: this.config.topic, messages });
  }

  connect(): Promise<void> {
    return this.producer.connect()
      .catch(e => console.log(`Can't connect ${e}`));
  }

  disconnect(): Promise<void> {
    return this.producer.disconnect()
      .catch(e => console.log(`Error on disconnect ${e}`));
  }
}
