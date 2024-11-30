import { createClient } from 'redis';
import logger from '../logger/logger.js';

let redisClient;

/**
 * Initializes the Redis client.
 */
export const initializeRedis = async () => {
    try {
        redisClient = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379',
        });

        redisClient.on('error', (err) => logger.error('Redis Client Error:', err));
        redisClient.on('connect', () => logger.info('Connected to Redis successfully'));

        await redisClient.connect();
    } catch (error) {
        logger.error('Failed to connect to Redis:', error.message);
        throw new Error('Redis initialization failed');
    }
};

/**
 * Sets a value in Redis with an optional expiration time.
 * @param {string} key - The cache key.
 * @param {*} value - The value to cache.
 * @param {number} expiration - Expiration time in seconds (default: 3600 seconds).
 */
export const setCache = async (key, value, expiration = 3600) => {
    if (!redisClient) throw new Error('Redis client not initialized');
    try {
        await redisClient.set(key, JSON.stringify(value), { EX: expiration });
        logger.info(`Cache set for key: ${key}`);
    } catch (error) {
        logger.error(`Failed to set cache for key: ${key}`, error.message);
    }
};

/**
 * Gets a value from Redis by key.
 * @param {string} key - The cache key.
 * @returns {*} The cached value, or null if not found.
 */
export const getCache = async (key) => {
    if (!redisClient) throw new Error('Redis client not initialized');
    try {
        const data = await redisClient.get(key);
        if (data) {
            logger.info(`Cache hit for key: ${key}`);
            return JSON.parse(data);
        }
        logger.info(`Cache miss for key: ${key}`);
        return null;
    } catch (error) {
        logger.error(`Failed to get cache for key: ${key}`, error.message);
        return null;
    }
};

/**
 * Deletes a value from Redis by key.
 * @param {string} key - The cache key.
 */
export const deleteCache = async (key) => {
    if (!redisClient) throw new Error('Redis client not initialized');
    try {
        await redisClient.del(key);
        logger.info(`Cache deleted for key: ${key}`);
    } catch (error) {
        logger.error(`Failed to delete cache for key: ${key}`, error.message);
    }
};

export default {
    initializeRedis,
    setCache,
    getCache,
    deleteCache,
};
