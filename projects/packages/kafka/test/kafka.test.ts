import { KafkaContainer, StartedKafkaContainer } from 'testcontainers';
import { TProducer } from '../src/TProducer';
import { TConsumer } from '../src/TConsumer';

// First time downloading the image takes more than 5sec
// use DEBUG=testcontainers for more logs
jest.setTimeout(300000);
describe('Kafka integration tests', () => {
  let kafka: StartedKafkaContainer;
  let producer: TProducer;
  let consumer: TConsumer;

  const topic = 'test-topic';

  beforeAll(async () => {
    console.log('Starting Kafka container...');
    
    kafka = await new KafkaContainer('confluentinc/cp-kafka:7.5.0')
      .withExposedPorts(9092, 9093, 2181)
      .start();
    
    console.log(`Kafka started on ${kafka.getHost()}:${kafka.getMappedPort(9093)}`);
    
    const config = {
      brokers: [`${kafka.getHost()}:${kafka.getMappedPort(9093)}`],
      clientId: 'test-container-kafka-client'
    };

    producer = new TProducer(config, { topic });
    consumer = new TConsumer(config, { topic, name: 'test-consumer' });
    await producer.connect();
    await consumer.connect();
    
    // Give consumer a moment to fully initialize
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  afterAll(async () => {
    console.log('Cleaning up...');
    await producer?.disconnect();
    await consumer?.disconnect();
    await kafka?.stop();
  });

  it('connects to Kafka cluster and sends a message', async () => {
    const testMessage = {
      key: 'test-key',
      value: JSON.stringify({
        message: 'Hello from Kafka!',
        timestamp: new Date().toISOString()
      })
    };

    await expect(producer.sendMessages([testMessage])).resolves.toBeDefined();
  });

  it('can send multiple messages', async () => {
    const messages = Array.from({ length: 5 }, (_, i) => ({
      key: `key-${i}`,
      value: JSON.stringify({ id: i, data: `Message ${i}` })
    }));

    await expect(producer.sendMessages(messages)).resolves.toBeDefined();
  });
});
