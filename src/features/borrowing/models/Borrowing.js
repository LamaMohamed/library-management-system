import { DataTypes } from 'sequelize';
import sequelize from '../../../core/database/connection.js';
import Borrower from '../../borrowers/models/Borrower.js';
import Book from '../../books/models/Book.js';

const Borrowing = sequelize.define('Borrowing', {
    dueDate: { type: DataTypes.DATE, allowNull: false },
    returned: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
    timestamps: true,
});

Borrowing.belongsTo(Borrower, { foreignKey: 'borrowerId' });
Borrowing.belongsTo(Book, { foreignKey: 'bookId' });

export default Borrowing;
