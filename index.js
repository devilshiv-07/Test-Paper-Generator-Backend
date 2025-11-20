const express = require('express');
const app = express();
const helmet = require('helmet');
const config = require('./config/config');
const connectDB = require('./config/database');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const cookieParser = require('cookie-parser');

// Environment config
const PORT = config.port;

// Connect to database
connectDB().catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
});

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cookieParser()); // For parsing cookies
app.use(helmet()); // For HTTP headers security

// Root Endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Hello from the Agility AI server!' });
});

// Other Routes with error handling
try {
    console.log('Loading routes...');
    app.use('/api/auth', require('./routes/authRoutes'));
    console.log('Auth routes loaded');
    
    app.use('/api/papers', require('./routes/paperRoutes'));
    console.log('Papers routes loaded');

    console.log('All routes loaded successfully');
} catch (error) {
    console.error('Error loading routes:', error);
    process.exit(1);
}

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