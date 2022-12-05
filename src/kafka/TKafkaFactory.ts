export interface SimpleConsumer {
  connect(): Promise<void>;

  disconnect(): Promise<void>;
}

export interface SimpleProducer {
  connect(): Promise<void>;

  disconnect(): Promise<void>;

  sendMessages(messages: any[]): Promise<void>;
}
