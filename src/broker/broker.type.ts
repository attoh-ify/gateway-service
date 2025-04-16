import { KAFKA_TOPIC, RABBITMQ_QUEUE } from './types';

/**
 * Interface representing the payload for publishing a message to Kafka.
 */
export interface KafkaPublishType<T = Record<string, unknown>> {
    headers?: Record<string, unknown>;
    topic: KAFKA_TOPIC;
    message: T;
};

/**
 * Interface for Kafka message broker operations.
 */
export type KafkaMessageBrokerType = {
    connectProducer: <T>(topic: string) => Promise<T>;
    disconnectProducer: () => Promise<void>;
    publish: (data: KafkaPublishType) => Promise<boolean>;
};

/**
 * Interface representing the payload for publishing a message to RabbitMQ.
 */
export interface RabbitMQPublishType<T = Record<string, unknown>> {
    headers?: Record<string, unknown>;
    queue: RABBITMQ_QUEUE;
    message: T;
};

/**
 * Interface for RabbitMQ message broker operations.
 */
export type RabbitmqMessageBrokerType = {
    connectProducer: <T>(topic: string) => Promise<T>;
    disconnectProducer: () => Promise<void>;
    publish: (data: RabbitMQPublishType) => Promise<boolean>;
};
