# Tour Management MERN Application - Quick Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Step-by-Step Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd back

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# Minimum required:
# - MONGODB_URI=mongodb://localhost:27017/tour-management
# - JWT_SECRET=your_secret_key
# - PORT=5000

# Start backend server
npm run dev
```

**Backend will run on:** `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd front/tour_front

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start frontend development server
npm run dev
```

**Frontend will run on:** `http://localhost:5173`

## Testing the Application

### 1. Create Tour Types (Admin)
```bash
POST http://localhost:5000/api/v1/tours/types
Content-Type: application/json

{
  "name": "Adventure"
}
```

### 2. Create a Tour (Admin)
```bash
POST http://localhost:5000/api/v1/tours
Content-Type: application/json

{
  "slug": "bali-adventure",
  "title": "Bali Adventure Tour",
  "description": "Experience the beauty of Bali",
  "images": ["https://example.com/bali.jpg"],
  "location": "Bali, Indonesia",
  "costFrom": 1200,
  "startDate": "2024-01-15T00:00:00Z",
  "endDate": "2024-01-20T00:00:00Z",
  "tourType": "YOUR_TOUR_TYPE_ID",
  "included": ["Accommodation", "Meals", "Transport"],
  "excluded": ["Travel Insurance"],
  "amenities": ["Swimming Pool", "WiFi", "Gym"],
  "tourPlan": ["Day 1: Arrive in Bali", "Day 2: Visit temples", "Day 3: Beach day"]
}
```

### 3. Register User
```bash
POST http://localhost:5000/api/v1/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

### 4. Login
```bash
POST http://localhost:5000/api/v1/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### 5. Create Booking
```bash
POST http://localhost:5000/api/v1/bookings
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "user": "USER_ID",
  "tour": "TOUR_ID",
  "guestCount": 2,
  "phone": "1234567890",
  "address": "123 Main St"
}
```

## API Documentation

See the main README.md for complete API documentation.

## Database Models

All database models are created automatically when the server starts using Mongoose.

## Features Implemented

✅ User Authentication & Authorization
✅ Tour CRUD Operations
✅ Booking Management
✅ Payment Tracking
✅ Tour Search
✅ User-friendly Frontend
✅ Responsive Design

## Common Issues & Solutions

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MongoDB URI in .env
- For local MongoDB: `mongodb://localhost:27017/tour-management`

### Port Already in Use
- Backend: Change PORT in .env
- Frontend: Vite will automatically use next available port

### CORS Errors
- Ensure backend CORS is configured
- Check API_URL in frontend .env

### Token Expiration
- JWT tokens expire in 7 days
- User needs to login again after expiration

## Development

### Backend Structure
- Models: Define MongoDB schemas
- Controllers: Business logic
- Routes: API endpoints
- Config: Configuration files

### Frontend Structure
- Components: Reusable UI components
- Pages: Full page components
- Context: State management
- API: API client configuration

## Deployment

### Backend (Node.js)
- Build: `npm run build`
- Deploy to: Heroku, Railway, Render, etc.

### Frontend (React)
- Build: `npm run build`
- Deploy to: Vercel, Netlify, AWS S3, etc.

## Additional Notes

- This is a starter template. Customize as needed.
- Implement additional security measures for production.
- Add payment gateway integration when ready.
- Implement email notifications for bookings.

## Support

For issues or questions, refer to the documentation in the code or create an issue.
