import { DataTypes } from 'sequelize';
import sequelize from '../../../core/database/connection.js';
import User from '../../../core/auth/models/User.js'

const Borrower = sequelize.define(
    'Borrower',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Name cannot be empty',
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'Must provide a valid email address',
                },
            },
        },
        registeredDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        timestamps: true,
        tableName: 'borrowers',
    }
);


Borrower.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

User.hasOne(Borrower, {
    foreignKey: 'userId',
    as: 'borrower',
});

export default Borrower;