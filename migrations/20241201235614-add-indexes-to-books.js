'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Add index for the `title` column
        await queryInterface.addIndex('books', ['title'], {
            name: 'books_title_index',
        });

        // Add index for the `author` column
        await queryInterface.addIndex('books', ['author'], {
            name: 'books_author_index',
        });

        // Add unique index for the `isbn` column
        await queryInterface.addIndex('books', ['isbn'], {
            name: 'books_isbn_unique_index',
            unique: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Remove indices in reverse order
        await queryInterface.removeIndex('books', 'books_isbn_unique_index');
        await queryInterface.removeIndex('books', 'books_author_index');
        await queryInterface.removeIndex('books', 'books_title_index');
    },
};
