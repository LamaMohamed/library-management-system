import { getElasticClient, createIndexIfNotExists } from '../../../../core/services/elasticsearch.js';
import { BOOKS_INDEX, BOOKS_MAPPINGS } from '../../constants/constants.js';


/**
 * Initializes the "books" index in Elasticsearch.
 */
export const initializeBooksIndex = async () => {
    try {
        await createIndexIfNotExists(BOOKS_INDEX, BOOKS_MAPPINGS);
    } catch (error) {
        console.error('Error initializing books index:', error.message);
        throw error;
    }
};

export const indexBook = async (book) => {
    const client = getElasticClient();
    await client.index({
        index: BOOKS_INDEX,
        id: book.id,
        body: {
            title: book.title,
            author: book.author,
            isbn: book.isbn,
        },
    });
};


export const updateBookInIndex = async (book) => {
    try {
        const client = getElasticClient();

        await client.update({
            index: BOOKS_INDEX,
            id: book.id,
            body: {
                doc: {
                    title: book.title,
                    author: book.author,
                    isbn: book.isbn,
                },
            },
        });
    } catch (error) {
        console.error('Error updating book in Elasticsearch:', error);
        throw error;
    }
};

export const deleteBookFromIndex = async (id) => {
    const client = getElasticClient();
    await client.delete({ index: BOOKS_INDEX, id });
};


export const searchBooks = async (query, page = 1, size = 10) => {
    const client = getElasticClient();

    const result = await client.search({
        index: BOOKS_INDEX,
        from: (page - 1) * size,
        size,
        body: {
            query: {
                multi_match: {
                    query,
                    fields: ['title^3', 'author', 'isbn'],
                },
            },
        },
    });

    return result.hits.hits.map((hit) => ({
        id: hit._id,
        ...hit._source,
    }));
};
