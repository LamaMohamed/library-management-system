import dotenv from 'dotenv';
import app from './app.js';
import sequelize from './database/connection.js';
import { initializeBooksIndex } from '../features/books/elasticsearch/booksIndex.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Initialize Elasticsearch Index
const initializeElasticsearch = async () => {
    try {
        await initializeBooksIndex();
        console.log('Elasticsearch indices initialized');
    } catch (error) {
        console.error('Failed to initialize Elasticsearch indices:', error.message);
        process.exit(1); // Exit the process if Elasticsearch setup fails
    }
};


// Start the Server
const startServer = async () => {
    try {
        // Initialize Elasticsearch
        await initializeElasticsearch();

        // Sync the database
        await sequelize.sync({ alter: true });
        console.log('Database connected');

        // Start listening for requests
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error.message);
        process.exit(1); // Exit the process on a critical failure
    }
};

// Initialize and Start Server
startServer();
