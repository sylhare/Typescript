import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { TProducer } from '@sylhare/kafka';
import { RedpandaConfig } from '../src/RedpandaConfig';

// First time downloading the image takes more than 5sec
// use DEBUG=testcontainers* for more logs
// Redpanda testcontainer has networking config issues with advertised addresses
// Use docker-compose for manual integration testing instead
jest.setTimeout(300000);

describe.skip('Redpanda integration tests (use docker-compose instead)', () => {
  let redpanda: StartedTestContainer;
  let producer: TProducer;

  const topic = 'test-topic';

  beforeAll(async () => {
    console.log('Starting Redpanda container...');
    
    redpanda = await new GenericContainer('redpandadata/redpanda:v23.2.3')
      .withCommand([
        'redpanda',
        'start',
        '--smp', '1',
        '--memory', '512M',
        '--reserve-memory', '0M',
        '--overprovisioned',
        '--set', 'redpanda.auto_create_topics_enabled=true',
        '--set', 'redpanda.enable_idempotence=true',
        '--kafka-addr', 'PLAINTEXT://0.0.0.0:29092',
        '--advertise-kafka-addr', 'PLAINTEXT://0.0.0.0:29092',
      ])
      .withExposedPorts(29092)
      .start();

    const mappedPort = redpanda.getMappedPort(29092);
    console.log(`Redpanda started on ${redpanda.getHost()}:${mappedPort}`);
    
    const config = RedpandaConfig.withBrokers(
      'test-redpanda-client',
      [`${redpanda.getHost()}:${mappedPort}`]
    );

    producer = new TProducer(config, { topic });
    
    await producer.connect();
    console.log('Producer connected successfully');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  afterAll(async () => {
    console.log('Cleaning up...');
    await producer?.disconnect();
    await redpanda?.stop();
  });

  it('connects to Redpanda cluster and sends a message', async () => {
    const testMessage = { 
      key: 'test-key',
      value: JSON.stringify({ 
        message: 'Hello from Redpanda!',
        timestamp: new Date().toISOString()
      })
    };

    await expect(producer.sendMessages([testMessage])).resolves.toBeDefined();
    console.log('Single message sent successfully');
  });

  it('can send multiple messages', async () => {
    const messages = Array.from({ length: 5 }, (_, i) => ({
      key: `key-${i}`,
      value: JSON.stringify({ id: i, data: `Message ${i}` })
    }));

    await expect(producer.sendMessages(messages)).resolves.toBeDefined();
    console.log('Multiple messages sent successfully');
  });
});

