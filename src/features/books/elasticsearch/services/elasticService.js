import { elasticClient } from '../../../../core/services/elasticsearch.js';

export const indexBook = async (book) => {
    await elasticClient.index({
        index: 'books',
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
        await elasticClient.update({
            index: 'books',
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
    await elasticClient.delete({ index: 'books', id });
};


export const searchBooks = async (query, page = 1, size = 10) => {
    const result = await elasticClient.search({
        index: 'books',
        from: (page - 1) * size,
        size,
        body: {
            query: {
                multi_match: {
                    query,
                    fields: ['title^3', 'author', 'isbn'], // Boost title matches
                },
            },
        },
    });

    return result.hits.hits.map((hit) => ({
        id: hit._id,
        ...hit._source,
    }));
};
