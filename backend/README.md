# Fest Yuva Nirman Hackathon - Backend Service

Backend service for the Fest Yuva Nirman Hackathon registration system. Built with Node.js, Express, and MongoDB.

## Features

- ✅ Complete registration API with validation
- ✅ MongoDB integration with Mongoose ODM
- ✅ Email uniqueness validation
- ✅ Phone number format validation
- ✅ Team size validation (2-5 members)
- ✅ Problem statement validation
- ✅ CORS enabled for frontend integration
- ✅ Rate limiting to prevent abuse
- ✅ Security headers with Helmet
- ✅ Comprehensive error handling
- ✅ Admin statistics endpoint

## Prerequisites

Before running this backend service, ensure you have:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
  - OR use **MongoDB Atlas** (cloud database) - [Sign up](https://www.mongodb.com/cloud/atlas)

## Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`:
     ```bash
     copy .env.example .env
     ```
   
   - Edit `.env` file with your configuration:
     ```env
     # For local MongoDB
     MONGODB_URI=mongodb://localhost:27017/fest-yuva-nirman
     
     # For MongoDB Atlas (cloud)
     # MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/fest-yuva-nirman
     
     PORT=5000
     NODE_ENV=development
     CLIENT_URL=http://127.0.0.1:5500
     ```

## Running MongoDB Locally

If using local MongoDB:

1. **Start MongoDB service:**
   ```bash
   # Windows (run as Administrator)
   net start MongoDB
   
   # Or start mongod directly
   mongod
   ```

2. **Verify MongoDB is running:**
   - Open a new terminal and run:
     ```bash
     mongosh
     ```
   - You should see the MongoDB shell

## Running the Server

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

You should see output like:
```
✅ MongoDB Connected: localhost
📊 Database: fest-yuva-nirman

🚀 Server is running!
📍 Port: 5000
🌍 Environment: development
🔗 API URL: http://localhost:5000
📝 API Docs: http://localhost:5000/
```

## API Endpoints

### Health Check
- **GET** `/api/health`
- Check if the server is running

### Create Registration
- **POST** `/api/registrations`
- **Body:**
  ```json
  {
    "teamName": "Team Innovators",
    "teamLeader": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "teamSize": "4",
    "problemChoice": "edu1"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Registration successful! We will contact you soon with further details.",
    "data": {
      "id": "65abc123...",
      "teamName": "Team Innovators",
      "teamLeader": "John Doe",
      "email": "john@example.com",
      "problemTitle": "Digital Learning Platform",
      "registrationDate": "2024-03-10T10:30:00.000Z"
    }
  }
  ```

### Get All Registrations
- **GET** `/api/registrations`
- **Query Parameters:**
  - `page` (default: 1)
  - `limit` (default: 10)

### Get Single Registration
- **GET** `/api/registrations/:id`

### Get Statistics
- **GET** `/api/registrations/admin/stats`
- Returns registration counts by problem statement and team size

## Validation Rules

### Team Name
- Required
- 3-100 characters

### Team Leader
- Required
- 2-100 characters

### Email
- Required
- Valid email format
- Must be unique (one registration per email)

### Phone
- Required
- Valid phone number format
- Supports international formats

### Team Size
- Required
- Must be between 2-5 members

### Problem Choice
- Required
- Must be one of: `edu1`, `health1`, `env1`, `social1`

## Testing the API

### Using Browser
Visit `http://localhost:5000` to see API documentation

### Using curl
```bash
# Create a registration
curl -X POST http://localhost:5000/api/registrations \
  -H "Content-Type: application/json" \
  -d "{\"teamName\":\"Test Team\",\"teamLeader\":\"Test Leader\",\"email\":\"test@example.com\",\"phone\":\"+91 9876543210\",\"teamSize\":\"3\",\"problemChoice\":\"edu1\"}"

# Get all registrations
curl http://localhost:5000/api/registrations

# Get statistics
curl http://localhost:5000/api/registrations/admin/stats
```

### Using Postman
1. Import the API endpoints
2. Set base URL to `http://localhost:5000`
3. Test each endpoint with sample data

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── models/
│   └── Registration.js      # Mongoose schema and model
├── routes/
│   └── registrations.js     # API route handlers
├── .env                     # Environment variables (DO NOT COMMIT)
├── .env.example             # Example environment variables
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies and scripts
├── server.js                # Main application entry point
└── README.md                # This file
```

## Security Features

- **Helmet**: Adds security headers
- **CORS**: Configured for your frontend origin
- **Rate Limiting**: Max 100 requests per 15 minutes per IP
- **Input Validation**: Using express-validator
- **Schema Validation**: Using Mongoose validators

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running:
```bash
net start MongoDB
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change the PORT in `.env` file or kill the process using port 5000

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution**: Install dependencies:
```bash
npm install
```

## Frontend Integration

The frontend form is already configured to connect to this backend. Make sure:

1. Backend server is running on `http://localhost:5000`
2. CORS is properly configured in `.env`
3. Frontend is accessing the correct API URL

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in `.env`
2. Use MongoDB Atlas for cloud database
3. Add proper authentication/authorization
4. Use environment-specific CORS origins
5. Add logging middleware
6. Set up monitoring

## License

ISC

## Support

For issues or questions, contact the development team.
