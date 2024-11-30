import { createIndexIfNotExists } from '../../../core/services/elasticsearch.js';

// Mapping configuration for the "books" index
const booksMappings = {
    properties: {
        title: { type: 'text' },
        author: { type: 'text' },
        isbn: { type: 'keyword' },
    },
};

/**
 * Initializes the "books" index in Elasticsearch.
 */
export const initializeBooksIndex = async () => {
    try {
        await createIndexIfNotExists('books', booksMappings);
    } catch (err) {
        console.error('Error creating books index:', err);
    }
};
