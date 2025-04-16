import express, { Request, Response } from 'express';
import { KafkaBroker } from '../kafka/message-broker';
import { RabbitMQBroker } from '../rabbitmq/message-broker';
import { getTopicForEvent, getTopicForQueue } from '../services/messageRouter';
import { logger } from '../utils/logger';

const router = express.Router();

/**
 * @swagger
 * /publish/event:
 *   post:
 *     summary: Publish an event to Kafka
 *     tags: [Kafka Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventType
 *               - sourceService
 *               - message
 *             properties:
 *               eventType:
 *                 type: string
 *               sourceService:
 *                 type: string
 *               message:
 *                 type: object
 *     responses:
 *       200:
 *         description: Event published successfully
 *       500:
 *         description: Kafka publish error
 */

// Kafka event publishing route
router.post('/publish/event', async (req: Request, res: Response) => {
    try {
        const { eventType, sourceService, message } = req.body;

        // Validate the request body
        if (!eventType || !sourceService || !message) {
            logger.info('Missing required fields in request body: eventType, sourceService, or message');
            res.status(400).json({ error: 'Missing required fields' });
        };

        // kafka setup
        const topic = getTopicForEvent(eventType);
        const token = req.headers.authorization || '';

        await KafkaBroker.publish({
            headers: { sourceService, token },
            topic,
            message,
        });

        logger.info(`[Kafka] Published to ${topic}`);
        res.status(200).json({ message: `[Kafka] Published to ${topic}` });
    } catch (error) {
        logger.error('[Kafka] Publish error:', error);
        res.status(500).json({ error: 'Failed to publish Kafka event' });
    };
});

/**
 * @swagger
 * /send/task:
 *   post:
 *     summary: Send a task to RabbitMQ
 *     tags: [RabbitMQ Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventType
 *               - sourceService
 *               - message
 *             properties:
 *               eventType:
 *                 type: string
 *               sourceService:
 *                 type: string
 *               message:
 *                 type: object
 *     responses:
 *       200:
 *         description: Task sent successfully
 *       500:
 *         description: RabbitMQ publish error
 */

// Rabbitmq task sending route
router.post('/send/task', async (req: Request, res: Response) => {
    try {
        const { eventType, sourceService, message } = req.body;

        // Validate the request body
        if (!eventType || !sourceService || !message) {
            logger.info('Missing required fields in request body: eventType, sourceService, or message');
            res.status(400).json({ error: 'Missing required fields' });
        };

        // RabbitMQ setup
        const topic = getTopicForQueue(eventType);
        await RabbitMQBroker.publish({
            headers: {
                sourceService,
                token: req.headers.authorization || ""
            },
            queue: topic,
            message,
        });
        logger.info(`[RabbitMQ] Task sent to ${topic}`);
        res.status(200).json({ message: `[RabbitMQ] Task sent to ${topic}` });
    } catch (error) {
        logger.error('[RabbitMQ] Publish error:', error);
        res.status(500).json({ error: 'Failed to send RabbitMQ task' });
    };
});


export default router;
