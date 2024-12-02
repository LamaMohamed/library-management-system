import { DataTypes } from 'sequelize';
import sequelize from '../../../core/database/connection.js';
import Borrower from '../../borrowers/models/Borrower.js';
import Book from '../../books/models/Book.js';

const Borrowing = sequelize.define(
    'Borrowing',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: {
                    msg: 'Due date must be a valid date',
                },
            },
        },
        returned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        timestamps: true,
        tableName: 'borrowings',
        indexes: [
            {
                fields: ['borrowerId'],
            },
            {
                fields: ['bookId'],
            },
        ],
    }
);

Borrowing.belongsTo(Borrower, {
    foreignKey: 'borrowerId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Borrowing.belongsTo(Book, {
    foreignKey: 'bookId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export default Borrowing;
