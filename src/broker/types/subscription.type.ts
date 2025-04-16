/**
 * Enum for Kafka topics used in event-driven architecture.
 */
export enum KAFKA_TOPIC {
    // User service
    USER_CREATED = 'user.created',
    USER_UPDATED = 'user.updated',
    USER_DELETED = 'user.deleted',

    // Notification service
    NOTIFICATION_SENT = 'notification.sent',
    EMAIL_DELIVERED = 'notification.email.delivered',

    // Payment service
    PAYMENT_COMPLETED = 'payment.completed',
    PAYMENT_FAILED = 'payment.failed',
};

/**
 * Enum for RabbitMQ queues used for background task processing.
 */
export enum RABBITMQ_QUEUE {
    // User service
    CREATE_USER = 'user.create',
    DELETE_USER = 'user.delete',
    RETRIEVE_USER_DATA = 'user.retrieve.data',

    // Notification service
    SEND_EMAIL = 'notification.send.email',
    SEND_SMS = 'notification.send.sms',

    // Payment service
    PROCESS_PAYMENT = 'payment.process',
    REFUND_PAYMENT = 'payment.refund',
};