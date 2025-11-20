# Test Paper Generator Backend

A robust Node.js backend API for generating and managing test papers. This backend provides authentication, paper management, and secure API endpoints for creating and retrieving AI-generated test papers.

## 🚀 Features

- **User Authentication**: Secure registration, login, and session management with JWT tokens
- **Paper Management**: Save and retrieve AI-generated test papers
- **Environment Separation**: Separate configurations for development and production
- **Security**: Password hashing, JWT authentication, secure cookies, and Helmet.js for HTTP security
- **Error Handling**: Centralized error handling with detailed error responses
- **Database**: MongoDB with Mongoose ODM for data persistence
- **RESTful API**: Clean and well-structured REST API endpoints

## 📋 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose 8.20.0
- **Authentication**: JSON Web Tokens (JWT) 9.0.2
- **Security**: 
  - bcrypt 6.0.0 (password hashing)
  - Helmet.js 8.1.0 (HTTP security headers)
  - Cookie-parser 1.4.7 (secure cookie management)
- **Environment**: dotenv 17.2.3
- **Error Handling**: http-errors 2.0.0

## 📁 Project Structure

```
Test-Paper-Generator-Backend/
├── config/
│   ├── config.js           # Environment configuration and settings
│   └── database.js         # MongoDB connection setup
├── controllers/
│   ├── paperController.js # Paper-related business logic
│   └── userController.js   # User authentication logic
├── middlewares/
│   ├── globalErrorHandler.js # Centralized error handling
│   └── tokenVerification.js  # JWT token verification middleware
├── models/
│   ├── paperModel.js       # Paper database schema
│   └── userModel.js        # User database schema
├── routes/
│   ├── authRoutes.js       # Authentication routes
│   └── paperRoutes.js      # Paper management routes
├── .env.development        # Development environment variables
├── .env.production         # Production environment variables
├── env.example             # Environment variables template
├── .gitignore              # Git ignore rules
├── index.js                # Application entry point
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## 🛠️ Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/devilshiv-07/Test-Paper-Generator-Backend.git
   cd Test-Paper-Generator-Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `env.example` to `.env.development` for local development
   - Update the values in `.env.development` with your configuration
   - For production, create `.env.production` with production values

   See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) for detailed environment configuration.

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000` (or your configured PORT)

## ⚙️ Environment Configuration

The application supports separate configurations for development and production environments.

### Required Environment Variables

- `NODE_ENV` - Environment mode (development/production)
- `PORT` - Server port number
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token signing
- `JWT_EXPIRES_IN` - JWT token expiration time (default: 1d)
- `COOKIE_MAX_AGE` - Cookie expiration in milliseconds (default: 30 days)
- `CORS_ORIGIN` - Allowed CORS origin URL

### Environment-Specific Behavior

**Development:**
- Cookie `secure` flag: `false` (works with HTTP)
- Cookie `sameSite`: `lax`
- Detailed error stack traces
- Default port: `3000`

**Production:**
- Cookie `secure` flag: `true` (requires HTTPS)
- Cookie `sameSite`: `none` (for cross-site requests)
- No error stack traces (security)
- Default port: `10000`
- Strict validation of required variables

For detailed setup instructions, see [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md).

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login user (sets accessToken cookie) | No |
| GET | `/api/auth/` | Get authenticated user's data | Yes |
| POST | `/api/auth/logout` | Logout user (clears cookie) | Yes |

**Request Body (Register/Login):**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Paper Routes (`/api/papers`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/papers` | Save AI-generated paper | Yes |
| GET | `/api/papers/:paperId` | Get paper by ID | Yes |

**Request Body (Save Paper):**
```json
{
  "examType": "JEE Main",
  "subjects": ["Mathematics", "Physics"],
  "topics": ["Algebra", "Mechanics"],
  "sets": 1,
  "numberOfQuestions": 10,
  "questions": [
    {
      "questionText": "Question text",
      "options": [
        { "optionText": "Option 1", "isCorrect": false },
        { "optionText": "Option 2", "isCorrect": true }
      ],
      "explanation": "Explanation text"
    }
  ]
}
```

**Note:** All responses follow the format `{ success: boolean, message: string, data: object }`. Users can only access papers they created.

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) stored in HTTP-only cookies for authentication.

**Authentication Flow:**
1. User registers/logs in → Server generates JWT and sets it as a cookie
2. Client automatically includes cookie in subsequent requests
3. `isVerifiedUser` middleware verifies token on protected routes
4. User object is attached to request for authorization checks

## 📊 Database Models

### User Model
- `email`: String (required, unique, lowercase, trimmed)
- `password`: String (required, minlength: 6, auto-hashed with bcrypt)
- `papers`: Array of ObjectId (references to Paper documents)
- `createdAt`, `updatedAt`: Auto-managed timestamps

### Paper Model
- `examType`: String (required)
- `subjects`: Array of String (required)
- `topics`: Array of String (required)
- `sets`: Number (default: 1)
- `numberOfQuestions`: Number (required)
- `questions`: Array of question objects with `questionText`, `options`, and `explanation`
- `createdBy`: ObjectId (required, references User)
- `createdAt`, `updatedAt`: Auto-managed timestamps

## 🛡️ Security Features

- **Password Security**: bcrypt hashing (10 salt rounds), never returned in responses
- **JWT Authentication**: HTTP-only cookies (XSS protection), secure flag in production
- **Security Headers**: Helmet.js middleware for HTTP header protection
- **Input Validation**: Field validation, email format, password length enforcement
- **Authorization**: Users can only access their own papers, token verification on protected routes

## ⚠️ Error Handling

Centralized error handling with environment-specific responses:
- **Development**: Detailed error stack traces
- **Production**: Generic error messages (security)
- **Status Codes**: 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Server Error)

**Error Response Format:**
```json
{
  "status": 400,
  "message": "Error message",
  "errorStack": "Stack trace (development only)"
}
```

## 📜 Available Scripts

- `npm run dev` - Start development server with nodemon (auto-reload)
- `npm start` - Start production server
- `npm run start:dev` - Alias for `npm run dev`
- `npm run start:prod` - Alias for `npm start`

## 🚦 Server Status

**GET** `/` - Health check endpoint returns server status message.

## 🔄 Database Connection

Automatic MongoDB connection on startup with:
- Connection string from `MONGODB_URI` environment variable
- Automatic reconnection and status logging
- Graceful error handling

## 📝 Additional Notes

- Automatic timestamp management (Mongoose)
- Password hashing before database storage
- Papers automatically linked to authenticated user
- Environment-adaptive cookie settings
- Graceful shutdown support (SIGTERM)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

ISC

## 👤 Author

[Shivank Tripathi / Agility AI]

## 🔗 Repository

[GitHub Repository](https://github.com/devilshiv-07/Test-Paper-Generator-Backend)

## 📞 Support

For issues and questions, please open an issue on the [GitHub Issues](https://github.com/devilshiv-07/Test-Paper-Generator-Backend/issues) page.

---

**Built with ❤️ for Agility AI**

