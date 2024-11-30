import { DataTypes } from 'sequelize';
import sequelize from '../../../core/database/connection.js';

const Book = sequelize.define('Book', {
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    isbn: { type: DataTypes.STRING, unique: true, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    shelfLocation: { type: DataTypes.STRING, allowNull: false },
}, {
    indexes: [
        { fields: ['title'] },
        { fields: ['author'] },
        { fields: ['isbn'] }
    ]
}, {
    timestamps: true,
});

export default Book;
