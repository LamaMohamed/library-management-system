import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database/connection.js';
import { USER_ROLES } from '../constants/userRoles.js';

class User extends Model {}

User.init(
    {
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: USER_ROLES.USER,
            validate: {
                isIn: {
                    args: [[USER_ROLES.ADMIN, USER_ROLES.LIBRARIAN, USER_ROLES.BORROWER, USER_ROLES.USER]],
                    msg: 'Invalid role',
                },
            },
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
    }
);

export default User;
