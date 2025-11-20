# Environment Setup Guide

This project supports separate configurations for **Development** and **Production** environments.

## Environment Files

Create the following environment files in the root directory:

### 1. `.env.development` (for local development)
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/test-paper-generator
JWT_SECRET=your-development-secret-key
JWT_EXPIRES_IN=1d
COOKIE_MAX_AGE=2592000000
CORS_ORIGIN=http://localhost:3000
```

### 2. `.env.production` (for production deployment)
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=your-production-mongodb-connection-string
JWT_SECRET=your-super-secure-production-secret-key
JWT_EXPIRES_IN=1d
COOKIE_MAX_AGE=2592000000
CORS_ORIGIN=https://your-production-domain.com
```

## Setup Instructions

### Step 1: Copy the example file
```bash
# Copy the example file to create your development environment file
cp env.example .env.development

# For production, create .env.production with your production values
```

### Step 2: Update the values
Edit `.env.development` and `.env.production` with your actual values:
- **MONGODB_URI**: Your MongoDB connection string
- **JWT_SECRET**: A strong, random secret key (use a different one for production!)
- **CORS_ORIGIN**: Your frontend URL (for production, use your actual domain)

### Step 3: Run the application

**Development:**
```bash
npm run dev
# or
npm run start:dev
```

**Production:**
```bash
npm start
# or
npm run start:prod
```

## Environment-Specific Behavior

### Development Environment
- Loads `.env.development`
- Cookie `secure` flag: `false` (works with HTTP)
- Cookie `sameSite`: `lax`
- Detailed error stack traces in responses
- Default port: `3000`
- More verbose logging

### Production Environment
- Loads `.env.production`
- Cookie `secure` flag: `true` (requires HTTPS)
- Cookie `sameSite`: `none` (for cross-site requests)
- No error stack traces in responses (security)
- Default port: `10000`
- Validates all required environment variables on startup

## Required Environment Variables

**For Production:**
- `MONGODB_URI` (required)
- `JWT_SECRET` (required)

**For Development:**
- These are recommended but not strictly required (will use defaults)

## Windows Users

If you're on Windows and the npm scripts don't work, you can:

1. **Set NODE_ENV manually before running:**
   ```cmd
   set NODE_ENV=development
   nodemon index.js
   ```

2. **Or use PowerShell:**
   ```powershell
   $env:NODE_ENV="development"
   nodemon index.js
   ```

3. **Or install cross-env for cross-platform support:**
   ```bash
   npm install --save-dev cross-env
   ```
   Then update package.json scripts to use `cross-env NODE_ENV=development`

## Security Notes

⚠️ **Important:**
- Never commit `.env.development` or `.env.production` to version control
- Use strong, unique JWT secrets for production
- In production, always use HTTPS
- Keep your production environment variables secure

## Troubleshooting

**Issue: "Missing required environment variable"**
- Make sure you've created the appropriate `.env` file
- Check that `NODE_ENV` is set correctly
- Verify all required variables are present in production

**Issue: "Database connection failed"**
- Verify your MongoDB URI is correct
- Ensure MongoDB is running (for local development)
- Check network connectivity (for remote databases)

