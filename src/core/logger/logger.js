import winston from 'winston';
import path from 'path';
import { LOG_DATE_FORMAT } from '../constants/index.js';

const logDirectory = path.resolve('logs');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: LOG_DATE_FORMAT }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
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



export default logger;
