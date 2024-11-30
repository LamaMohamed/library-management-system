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
         // Initialize services
        await initializeRedis();
        await initializeElasticsearch();

        // Initialize feature-specific indices
        await initializeBooksIndex();

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
