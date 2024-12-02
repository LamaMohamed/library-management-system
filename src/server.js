import dotenv from 'dotenv';
import app from './app.js';
import sequelize from './core/database/connection.js';
import { initializeElasticsearch } from './core/services/elasticsearch.js'
import { initializeBooksIndex } from './features/books/services/elasticsearch/bookElasticService.js';
import { initializeRedis } from './core/services/redis.js';

dotenv.config();

const PORT = process.env.PORT || 3000;


// Start the Server
const startServer = async () => {
    try {
        console.log('Initializing server...');

        // Initialize services
        console.log('Initializing Redis...');
        await initializeRedis();
        console.log('Redis initialized successfully.');

        console.log('Initializing Elasticsearch...');
        await initializeElasticsearch();
        console.log('Elasticsearch initialized successfully.');

        // Initialize feature-specific indices
        console.log('Initializing Elasticsearch indices...');
        await initializeBooksIndex();
        console.log('Books index initialized successfully.');

        // Sync the database
        console.log('Connecting to the database...');
        await sequelize.sync();
        console.log('Database connected successfully.');

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
