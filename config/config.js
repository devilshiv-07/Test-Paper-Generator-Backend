// Load environment variables based on NODE_ENV
const nodeEnv = process.env.NODE_ENV || "development";

// Load appropriate .env file (silently fail if file doesn't exist)
if (nodeEnv === "production") {
  require("dotenv").config({ path: ".env.production" });
  // Also try to load .env as fallback
  require("dotenv").config({ path: ".env", override: false });
} else if (nodeEnv === "development") {
  require("dotenv").config({ path: ".env.development" });
  // Also try to load .env as fallback
  require("dotenv").config({ path: ".env", override: false });
} else {
  // Fallback to default .env
  require("dotenv").config();
}

// Validate required environment variables
const requiredEnvVars = ["MONGODB_URI", "JWT_SECRET"];

if (nodeEnv === "production") {
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      console.error(`❌ Error: Missing required environment variable: ${varName}`);
      process.exit(1);
    }
  });
}

const config = Object.freeze({
  port: process.env.PORT || (nodeEnv === "production" ? 10000 : 3000),
  databaseURI: process.env.MONGODB_URI,
  nodeEnv: nodeEnv,
  accessTokenSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  cookieMaxAge: process.env.COOKIE_MAX_AGE || 1000 * 60 * 60 * 24 * 30, // 30 days
  // Cookie settings based on environment
  cookieOptions: {
    httpOnly: true,
    sameSite: nodeEnv === "production" ? "none" : "lax",
    secure: nodeEnv === "production", // Only secure in production (HTTPS required)
    maxAge: parseInt(process.env.COOKIE_MAX_AGE) || 1000 * 60 * 60 * 24 * 30
  },
  // CORS settings
  corsOrigin: process.env.CORS_ORIGIN || (nodeEnv === "production" ? "" : "http://localhost:3000"),
  // Logging
  enableDetailedLogs: nodeEnv === "development"
});

module.exports = config;