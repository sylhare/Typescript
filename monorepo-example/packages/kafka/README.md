# @sylhare/kafka

Kafka consumer and producer package with a clean TypeScript API.

## Overview

This package provides a simple, type-safe interface for working with Apache Kafka using KafkaJS under the hood.

## Installation

```bash
npm install
```

## Usage

### Basic Configuration

```typescript
import { TKafkaConfig, TProducer, TConsumer } from '@sylhare/kafka';

// Create config
const config = new TKafkaConfig('my-client-id', process.env);

// Create producer
const producer = new TProducer(config, { topic: 'my-topic' });
await producer.connect();

// Send messages
await producer.sendMessages([
  { key: 'key1', value: 'Hello Kafka!' }
]);

// Create consumer
const consumer = new TConsumer(config, { 
  topic: 'my-topic',
  name: 'my-consumer'
});
await consumer.connect();
```

### Environment Variables

The package uses the following environment variables:
- `KAFKA_BOOTSTRAP_SERVERS`: Comma-separated list of Kafka brokers (default: `localhost:9092`)

### Consumer Configuration

```typescript
const consumer = new TConsumer(config, {
  topic: 'my-topic',
  name: 'consumer-name',
  heartbeatIntervalMs: 3000,
  sessionTimeoutMs: 30000,
  autoCommitIntervalMs: 5000,
  autoCommitThresholdLimit: 100
});
```

### Custom Message Handler

Extend `TConsumer` to handle messages:

```typescript
import { TConsumer, TConsumerConfiguration } from '@sylhare/kafka';
import { EachMessagePayload } from 'kafkajs';

class MyConsumer extends TConsumer {
  async messageHandler(payload: EachMessagePayload): Promise<void> {
    const { topic, partition, message } = payload;
    console.log({
      topic,
      partition,
      offset: message.offset,
      value: message.value?.toString(),
    });
  }
}
```

## Testing

Run tests:

```bash
npm test
```

The tests include:
- Unit tests with mocks
- Integration tests with Testcontainers (requires Docker)

## API

### TKafkaConfig

Main configuration class for Kafka connections.

### TProducer

Producer implementation with methods:
- `connect()`: Connect to Kafka
- `disconnect()`: Disconnect from Kafka
- `sendMessages(messages)`: Send an array of messages

### TConsumer

Consumer implementation with methods:
- `connect()`: Connect to Kafka and start consuming
- `disconnect()`: Disconnect from Kafka
- `messageHandler(payload)`: Override to handle messages

### Interfaces

- `SimpleProducer`: Interface for producers
- `SimpleConsumer`: Interface for consumers
- `TKafkaFactory`: Factory interface for creating producers and consumers

