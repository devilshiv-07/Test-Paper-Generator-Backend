<<<<<<< HEAD
require('dotenv').config();

const config = Object.freeze({
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV || 'development',
  accessTokenSecret: process.env.JWT_SECRET,
});
=======
require("dotenv").config();

const config = Object.freeze({
  port: process.env.PORT || 3000,
  databaseURI: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV || "development",
  accessTokenSecret : process.env.JWT_SECRET
})
>>>>>>> 2fd27bd4bc8b367cdd85defedb030a44b10ac4be

module.exports = config;