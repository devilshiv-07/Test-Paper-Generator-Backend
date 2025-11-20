const config = require('../config/config');

const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
<<<<<<< HEAD
=======

>>>>>>> 2fd27bd4bc8b367cdd85defedb030a44b10ac4be
    return res.status(statusCode).json({
        status: statusCode,
        message: err.message || 'Internal Server Error',
        errorStack: config.nodeEnv === 'development' ? err.stack : "",
    })
<<<<<<< HEAD


=======
>>>>>>> 2fd27bd4bc8b367cdd85defedb030a44b10ac4be
}

module.exports = globalErrorHandler;