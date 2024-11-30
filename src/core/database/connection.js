import { Sequelize } from 'sequelize';
import { config } from '../configs/config.js';

const { host, port, user, password, database } = config.db;


const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false, // Disable logging;
});

export default sequelize;
