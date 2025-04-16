import { KAFKA_TOPIC, RABBITMQ_QUEUE } from '../broker/types';
import { logger } from '../utils/logger';

/**
 * Resolves the Kafka topic for a given event type.
 * @param eventType - The type of event to resolve.
 * @returns The Kafka topic or throws an error if not found.
 */
export function getTopicForEvent(eventType: keyof typeof KAFKA_TOPIC): KAFKA_TOPIC {
  const topic = KAFKA_TOPIC[eventType];
  if (!topic) {
    logger.error(`Unknown Kafka event type: ${eventType}`);
    throw new Error(`Unknown Kafka event type: ${eventType}`);
  };
  return topic;
};

/**
 * Resolves the RabbitMQ queue for a given event type.
 * @param eventType - The type of task to resolve.
 * @returns The RabbitMQ queue or throws an error if not found.
 */
export function getTopicForQueue(eventType: keyof typeof RABBITMQ_QUEUE): RABBITMQ_QUEUE {
  const queue = RABBITMQ_QUEUE[eventType];
  if (!queue) {
    logger.error(`Unknown RabbitMQ event type: ${eventType}`);
    throw new Error(`Unknown RabbitMQ event type: ${eventType}`);
  };
  return queue;
};
