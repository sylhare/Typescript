import { KafkaContainer, StartedKafkaContainer } from 'testcontainers';
import { TProducer } from '../../src/kafka/TProducer';
import { TConsumer } from '../../src/kafka/TConsumer';

// First time downloading the image takes more than 5sec
// use DEBUG=testcontainers for more logs
jest.setTimeout(300000);
describe.skip('Kafka tests', () => {
  let kafka: StartedKafkaContainer;
  let producer: TProducer;
  let consumer: TConsumer;

  const topic = 'test-topic';

  beforeAll(async () => {
    kafka = await new KafkaContainer('confluentinc/cp-kafka')
      .withExposedPorts(9092, 9093, 2181)
      .start();
    const config = {
      brokers: [`${kafka.getHost()}:${kafka.getMappedPort(9093)}`],
      clientId: 'test-container-kafka-client'
    };

    producer = new TProducer(config, { topic });
    consumer = new TConsumer(config, { topic });
    await producer.connect();
    await consumer.connect();
  });

  afterAll(async () => {
    await producer?.disconnect();
    await consumer?.disconnect();
    await kafka?.stop();
  });

  it('connects to kafka cluster and sends a message', async () => {
    await expect(producer.sendMessages([{ value: 'test message' }])).resolves.toBeDefined();
  });
});
