import winston from 'winston';
import path from 'path';
import { LOG_DATE_FORMAT } from '../constants/index.js';

const logDirectory = path.resolve('logs');

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.timestamp({ format: LOG_DATE_FORMAT }),
        winston.format.json() 
    ),
    transports: [
        ...(process.env.NODE_ENV !== 'production'
            ? [new winston.transports.Console({ format: winston.format.simple() })]
            : []),

        // File transport for all environments
        new winston.transports.File({
            filename: path.join(logDirectory, 'application.log'),
            level: 'info', 
            maxsize: 5 * 1024 * 1024, 
            maxFiles: 5, 
        }),

        new winston.transports.File({
            filename: path.join(logDirectory, 'error.log'),
            level: 'error',
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: path.join(logDirectory, 'exceptions.log') }),
    ],
    exitOnError: false,
});

import fs from 'fs';
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

export default logger;
