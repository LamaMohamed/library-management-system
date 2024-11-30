import express from 'express';
import helmet  from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { BASE_API_URL } from './core/constants/index.js';
import authRoutes from './core/auth/routes/authRoutes.js';
import authMiddleware from './core/auth/middleware/authMiddleware.js';

import bookRoutes from './features/books/routes/bookRoutes.js';
import borrowerRoutes from './features/borrowers/routes/borrowerRoutes.js';
import borrowingRoutes from './features/borrowing/routes/borrowingRoutes.js';

import { apiRateLimiter } from './core/middleware/rateLimiter.js';
import { errorHandler } from './core/middleware/errorMiddleware.js';

const { authenticate } = authMiddleware;
const app = express();

// Apply Middlewares
const configureMiddlewares = () => {

    app.use(express.json()); // Parse JSON
    app.use(helmet());
    app.use(cors()); // Enable CORS
    app.use(bodyParser.json()); // Parse application/json
    app.use(cookieParser()); // Enable cookie parsing
    app.use(apiRateLimiter); // Apply rate limiter

    // Conditionally enable Morgan for development environment
    if (process.env.NODE_ENV !== 'production') {
        morgan.token('id', (req) => req.id);
        app.use(morgan(':method :url :status :res[content-length] - :response-time ms :id'));
    }
};

// Apply Routes
const configureRoutes = () => {
    // Auth Routes
    app.use(`${BASE_API_URL}/auth`, authRoutes);

    // Feature Routes with Authentication
    app.use(`${BASE_API_URL}/books`, authenticate, bookRoutes);
    app.use(`${BASE_API_URL}/borrowers`, authenticate, borrowerRoutes);
    app.use(`${BASE_API_URL}/borrowing`, authenticate, borrowingRoutes);
};

// Global Error Handler
const configureErrorHandling = () => {
    app.use(errorHandler);
};

// Initialize Middleware, Routes, and Error Handling
configureMiddlewares();
configureRoutes();
configureErrorHandling();

export default app;
