import { DataTypes } from 'sequelize';
import sequelize from '../../../core/database/connection.js';

const Book = sequelize.define(
    'Book',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Title cannot be empty',
                },
            },
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Author cannot be empty',
                },
            },
        },
        isbn: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'ISBN cannot be empty',
                },
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: 'Quantity must be an integer',
                },
                min: {
                    args: [0],
                    msg: 'Quantity cannot be negative',
                },
            },
        },
        shelfLocation: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Shelf location cannot be empty',
                },
            },
        },
    },
    {
        timestamps: true,
        tableName: 'books',
        indexes: [
            {
                name: 'books_title_index', 
                fields: ['title'],
            },
            {
                name: 'books_author_index', 
                fields: ['author'],
            },
            {
                name: 'books_isbn_unique_index', 
                fields: ['isbn'],
                unique: true,
            },
        ],
    }
);

export default Book;
