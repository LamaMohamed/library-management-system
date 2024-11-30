import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Elasticsearch client
const elasticClient = new Client({
    node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
    maxRetries: 5, 
    requestTimeout: 60000,
});

/**
 * Utility to create an Elasticsearch index with a given name and mapping.
 *
 * @param {string} indexName - Name of the Elasticsearch index.
 * @param {object} mappings - Mapping configuration for the index.
 */
const createIndexIfNotExists = async (indexName, mappings) => {
    const exists = await elasticClient.indices.exists({ index: indexName });

    if (!exists) {
        await elasticClient.indices.create({
            index: indexName,
            body: { mappings },
        });
        console.log(`${indexName} index created`);
    } else {
        console.log(`${indexName} index already exists`);
    }
};

export { elasticClient, createIndexIfNotExists };
