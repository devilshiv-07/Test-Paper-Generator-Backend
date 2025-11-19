require('dotenv').config();

const config = Object.freeze({
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV || 'development',
  accessTokenSecret: process.env.JWT_SECRET,
});

module.exports = config;