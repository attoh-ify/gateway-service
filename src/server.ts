import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import compression from 'compression';
import { config } from './config/config';
import router from './routes/serviceRouter';
import { swaggerUi, swaggerSpec } from './utils/swagger';
import { logger } from './utils/logger';

const PORT = config.PORT;
const server = express();

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(
    cors({
        origin: config.CLIENT_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);
server.use(helmet());  // Helmet – HTTP Security Headers
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});  // Rate Limiting – Prevent DDoS & brute-force attacks
server.use('/api', limiter); // Apply only to API routes
server.use(hpp());  // HPP – HTTP Parameter Pollution Protection
server.use(compression());  // Compression – Improve performance

// Routes
server.use('/api', router);

// Swagger documentation
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
server.listen(PORT, () => {
    logger.info(`[Gateway Service] Listening on port ${PORT}`);
});
