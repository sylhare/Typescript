import { ExampleFactory, ExampleService } from './Example';
import { TProducer } from '../src/TProducer';
import { TConsumer } from '../src/TConsumer';
import { MockConsumer, MockKafka, MockProducer } from './MockKafka';

describe('kafka', function () {
  const topic = 'example-topic';
  const factory = new ExampleFactory();
  const producer = factory.producer({ topic });
  const consumer = factory.consumer({ topic });

  describe('Producer and Consumer', () => {
    it('example factory created producer', () => expect(producer).toBeInstanceOf(TProducer));

    it('example factory created consumer', () => expect(consumer).toBeInstanceOf(TConsumer));
  });

  describe('Use with stub', () => {
    const consumerStub = {
      connect: jest.fn().mockResolvedValue(() => Promise.resolve()),
      disconnect: jest.fn().mockResolvedValue(() => Promise.resolve()),
    };

    const producerStub = {
      connect: jest.fn().mockResolvedValue(() => Promise.resolve()),
      disconnect: jest.fn().mockResolvedValue(() => Promise.resolve()),
      sendMessages: jest.fn().mockResolvedValue(() => Promise.resolve()),
    };
    const service = new ExampleService(producerStub, consumerStub);

    it('connects', async () => {
      await service.start();
      expect(service.isConnected).toBeTruthy();
    });

    it('disconnects', async () => {
      await service.start();
      expect(service.isConnected).toBeTruthy();
      await service.stop();
      expect(service.isConnected).toBeFalsy();
    });

    it('does stuff', async () => {
      const messages = [{ value: Buffer.from(JSON.stringify({ hello: 'world' })) }];
      await service.send(messages);
      expect(producerStub.sendMessages).toHaveBeenCalledWith(messages);
    });
  });

  describe('Use with Mocks', () => {
    const kafka = new MockKafka();
    const mockConsumer = new MockConsumer();
    const mockProducer = new MockProducer(kafka, topic);

    beforeAll(() => kafka.register(mockConsumer));

    it('can produce and consume messages', () => {
      mockProducer.sendMessages([{
        key: '1', value: JSON.stringify({ hello: 'world' })
      }]);
      expect(mockConsumer.handled.length).toEqual(1);
    });
  });
});
