# 🧪 API TESTING GUIDE - Test All Endpoints

## 📋 BEFORE YOU START

**Prerequisites:**
- Backend running on `http://localhost:5000`
- Database seeded with dummy data
- Token from login (for protected endpoints)

**Tools to use:**
- Postman: https://www.postman.com/
- Insomnia: https://insomnia.rest/
- Thunder Client (VS Code extension)
- Or use curl commands

---

## 🔐 AUTHENTICATION ENDPOINTS

### 1️⃣ **Register New User**

**Method:** `POST`
**URL:** `http://localhost:5000/api/v1/users/register`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "name": "Your Name",
  "email": "youremail@example.com",
  "password": "password123",
  "phone": "01912345678",
  "address": "Your Address"
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Your Name",
    "email": "youremail@example.com",
    "role": "User",
    "phone": "01912345678",
    "address": "Your Address",
    "isActive": "Active",
    "isVerified": false
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "User already exists"
}
```

---

### 2️⃣ **Login User**

**Method:** `POST`
**URL:** `http://localhost:5000/api/v1/users/login`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "User",
      "phone": "01912345678"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTFiMmMzZDRlNWY2ZzdoOGk5ajBrMSIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNzAxNjMyNzQ4LCJleHAiOjE3MDIyMzc1NDh9.abc123xyz"
  }
}
```

⚠️ **Copy the token for next requests!**

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 3️⃣ **Get User Profile** (Protected)

**Method:** `GET`
**URL:** `http://localhost:5000/api/v1/users/profile`

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User",
    "phone": "01912345678",
    "address": "123 Main Street, Dhaka"
  }
}
```

---

## 🎫 TOUR ENDPOINTS

### 4️⃣ **Get All Tours**

**Method:** `GET`
**URL:** `http://localhost:5000/api/v1/tours?skip=0&limit=10`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Query Parameters:**
- `skip`: Number of tours to skip (default: 0)
- `limit`: Number of tours to return (default: 10)

**Expected Response (200 OK):**
```json
{
  "success": true,
  "tours": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "slug": "paris-city-tour-2024",
      "title": "Paris City Tour",
      "description": "Explore the beautiful city of Paris...",
      "location": "Paris, France",
      "costFrom": 1500,
      "startDate": "2025-06-01T00:00:00.000Z",
      "endDate": "2025-06-07T00:00:00.000Z",
      "tourType": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
        "name": "City Tour"
      },
      "images": ["paris1.jpg", "paris2.jpg"],
      "included": ["Hotel", "Transport", "Breakfast"],
      "amenities": ["WiFi", "AC"]
    }
  ],
  "total": 5
}
```

---

### 5️⃣ **Get Tour by ID**

**Method:** `GET`
**URL:** `http://localhost:5000/api/v1/tours/65a1b2c3d4e5f6g7h8i9j0k2`

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "title": "Paris City Tour",
    "costFrom": 1500,
    ...full tour data...
  }
}
```

---

### 6️⃣ **Get Tour by Slug**

**Method:** `GET`
**URL:** `http://localhost:5000/api/v1/tours/slug/paris-city-tour-2024`

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "title": "Paris City Tour",
    ...
  }
}
```

---

### 7️⃣ **Search Tours**

**Method:** `GET`
**URL:** `http://localhost:5000/api/v1/tours/search?q=paris&skip=0&limit=10`

**Query Parameters:**
- `q`: Search query (tour title, location, description)
- `skip`: Pagination
- `limit`: Results per page

**Expected Response (200 OK):**
```json
{
  "success": true,
  "tours": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "title": "Paris City Tour",
      "location": "Paris, France",
      ...
    }
  ],
  "total": 1
}
```

---

### 8️⃣ **Get Tour Types**

**Method:** `GET`
**URL:** `http://localhost:5000/api/v1/tours/types`

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
      "name": "Beach Resort",
      "description": "Relaxing beach vacation tours"
    },
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
      "name": "Mountain Trek",
      "description": "Adventure mountain climbing tours"
    }
  ]
}
```

---

## 📅 BOOKING ENDPOINTS

### 9️⃣ **Create Booking** (Protected)

**Method:** `POST`
**URL:** `http://localhost:5000/api/v1/bookings`

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

**Request Body:**
```json
{
  "tour": "65a1b2c3d4e5f6g7h8i9j0k2",
  "guestCount": 2,
  "phone": "01912345678",
  "address": "Your Address, Dhaka"
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k5",
    "user": "65a1b2c3d4e5f6g7h8i9j0k1",
    "tour": "65a1b2c3d4e5f6g7h8i9j0k2",
    "guestCount": 2,
    "phone": "01912345678",
    "address": "Your Address, Dhaka",
    "status": "Pending",
    "payment": "65a1b2c3d4e5f6g7h8i9j0k6"
  }
}
```

---

### 🔟 **Get All Bookings** (Protected)

**Method:** `GET`
**URL:** `http://localhost:5000/api/v1/bookings?skip=0&limit=10`

**Headers:**
```json
{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "bookings": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k5",
      "user": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "tour": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
        "title": "Paris City Tour"
      },
      "status": "Pending",
      "guestCount": 2
    }
  ],
  "total": 1
}
```

---

### 1️⃣1️⃣ **Get User's Bookings** (Protected)

**Method:** `GET`
**URL:** `http://localhost:5000/api/v1/bookings/user/65a1b2c3d4e5f6g7h8i9j0k1`

**Headers:**
```json
{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "bookings": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k5",
      "tour": {
        "title": "Paris City Tour",
        "location": "Paris, France",
        "costFrom": 1500
      },
      "status": "Pending",
      "guestCount": 2,
      "createdAt": "2024-12-04T10:30:00.000Z"
    }
  ],
  "total": 1
}
```

---

## 🧪 CURL COMMANDS (Quick Testing)

### Register User
```bash
curl -X POST http://localhost:5000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "password":"password123",
    "phone":"01912345678",
    "address":"Test Address"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@example.com",
    "password":"password123"
  }'
```

### Get All Tours
```bash
curl -X GET http://localhost:5000/api/v1/tours?skip=0&limit=10 \
  -H "Content-Type: application/json"
```

### Create Booking (replace TOKEN with actual token)
```bash
curl -X POST http://localhost:5000/api/v1/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "tour":"65a1b2c3d4e5f6g7h8i9j0k2",
    "guestCount":2,
    "phone":"01912345678",
    "address":"Your Address"
  }'
```

---

## 🔐 HOW AUTHENTICATION WORKS

```
1. REGISTER
   POST /users/register
   ├─ Backend: Hash password with bcryptjs
   ├─ Backend: Save to MongoDB users collection
   └─ Response: Success message

2. LOGIN
   POST /users/login
   ├─ Backend: Find user by email
   ├─ Backend: Compare password (bcryptjs)
   ├─ Backend: Generate JWT token (7 days expiry)
   └─ Response: Token + User data

3. PROTECTED REQUEST
   GET /bookings (with Authorization header)
   ├─ Frontend: Add token to header
   │  Authorization: Bearer eyJhbGc...
   ├─ Backend: Verify JWT token
   ├─ Backend: Extract user ID from token
   ├─ Backend: Query user's bookings
   └─ Response: User's data only

4. INVALID TOKEN
   └─ Response: 401 Unauthorized
```

---

## 📊 TEST SCENARIOS

### Scenario 1: Complete User Flow
1. Register new user
2. Login with registered user
3. Get user profile
4. Get all tours
5. Create booking
6. Get user bookings

### Scenario 2: Search and Book
1. Search tours by query
2. Get specific tour by ID
3. Create booking for tour
4. Check booking status

### Scenario 3: Error Handling
1. Login with wrong password → 401
2. Register with existing email → 400
3. Book without token → 401
4. Get non-existent tour → 404

---

## ✅ SUCCESS CHECKLIST

- [ ] Register endpoint works (201)
- [ ] Login endpoint works (200, returns token)
- [ ] Get tours endpoint works (200)
- [ ] Create booking endpoint works (201)
- [ ] Protected endpoints require token
- [ ] Wrong token gives 401
- [ ] Search tours works
- [ ] User bookings filtered correctly

**Now you can test all endpoints! 🎉**
