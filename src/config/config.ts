interface KafkaConfig {
  BROKER1: string;
}

interface RabbitMQConfig {
  RABBITMQ_URL: string;
  EXCHANGE_NAME: string;
  EXCHANGE_TYPE: string;
}

interface AppConfig {
  PORT: number;
  CLIENT_ID: string;
  CLIENT_URL: string;
  kafka: KafkaConfig;
  rabbitmq: RabbitMQConfig;
}

export const config: AppConfig = {
  PORT: Number(process.env.PORT) || 2000,
  CLIENT_ID: process.env.CLIENT_ID || 'gateway-service',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:2000',

  kafka: {
    BROKER1: process.env.BROKER1 || 'localhost:9092',
  },

  rabbitmq: {
    RABBITMQ_URL: process.env.RABBITMQ_URL || 'amqp://localhost',
    EXCHANGE_NAME: process.env.EXCHANGE_NAME || 'direct_logs',
    EXCHANGE_TYPE: process.env.EXCHANGE_TYPE || 'direct',
  },
};
