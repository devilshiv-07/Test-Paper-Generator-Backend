const express = require('express');
const app = express();
const config = require('./config/config');
const connectDB = require('./config/database');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const cookieParser = require('cookie-parser');

// Environment config
const PORT = config.port || process.env.PORT || 10000;

// Connect to database
connectDB().catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
});

// Middleware
app.use(express.json());
app.use(cookieParser());

// Root Endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Hello from the Agility AI server!' });
});

// Global Error Handler
app.use(globalErrorHandler);

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Agility AI Server is running on port ${PORT}`);
    console.log(`Environment: ${config.nodeEnv}`);
});

// Handle server errors
server.on('error', (err) => {
    console.error('Server error:', err);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});