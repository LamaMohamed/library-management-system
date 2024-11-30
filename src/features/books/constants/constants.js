// Constants for Books Feature

export const BOOKS_INDEX = 'books';
export const BOOKS_CACHE_KEY = 'books_list';

export const BOOKS_MAPPINGS = {
    properties: {
        title: { type: 'text' },
        author: { type: 'text' },
        isbn: { type: 'keyword' },
    },
};