import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

import logger from '../logger/logger.js';

dotenv.config();


let elasticClient;

/**
 * Initializes the Elasticsearch client and validates connection.
 */
export const initializeElasticsearch = async () => {
    try {
        elasticClient = new Client({
            node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
            maxRetries: 5,
            requestTimeout: 60000,
        });

        // Verify Elasticsearch connection
        const health = await elasticClient.cluster.health();
        logger.info('Elasticsearch cluster health:', health.status);

        logger.info('Elasticsearch client initialized successfully');
    } catch (error) {
        logger.error('Failed to initialize Elasticsearch:', error.message);
        throw new Error('Elasticsearch initialization failed');
    }
};

/**
 * Utility to create an Elasticsearch index with a given name and mapping.
 *
 * @param {string} indexName - Name of the Elasticsearch index.
 * @param {object} mappings - Mapping configuration for the index.
 */
export const createIndexIfNotExists = async (indexName, mappings) => {
    try {
        const exists = await elasticClient.indices.exists({ index: indexName });

        if (!exists) {
            await elasticClient.indices.create({
                index: indexName,
                body: { mappings },
            });
            logger.info(`Index '${indexName}' created successfully`);
        } else {
            logger.info(`Index '${indexName}' already exists`);
        }
    } catch (error) {
        logger.error(`Failed to create index '${indexName}':`, error.message);
        throw error;
    }
};

/**
 * Returns the Elasticsearch client for advanced operations.
 */
export const getElasticClient = () => {
    if (!elasticClient) {
        throw new Error('Elasticsearch client is not initialized. Call initializeElasticsearch first.');
    }
    return elasticClient;
};

export default{ initializeElasticsearch, createIndexIfNotExists, getElasticClient };
