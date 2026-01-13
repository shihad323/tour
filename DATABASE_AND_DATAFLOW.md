# 🗄️ COMPLETE DATABASE & DATA FLOW GUIDE

## 📊 DATABASE INFORMATION

### **Database Connection**
**Location:** `g:\tour\back\.env`

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://iftakhar01755_db_user:aiwMvYdV6arT1FMN@cluster0.vodmaws.mongodb.net/?retryWrites=true&w=majority
```

**Database Name:** `cluster0`
**Provider:** MongoDB Atlas (Cloud)
**Server:** MongoDB Cloud at vodmaws.mongodb.net

---

## 🏗️ DATABASE SCHEMA & COLLECTIONS

### **1. USERS COLLECTION**
**File:** `g:\tour\back\src\app\user\user.model.ts`

```javascript
{
  _id: ObjectId,
  name: String,              // Required
  email: String,             // Required, unique, lowercase
  password: String,          // Required, min 6 chars, hashed
  role: String,              // 'Admin' or 'User' (default: 'User')
  phone: String,             // Optional
  picture: String,           // Default: placeholder image
  address: String,           // Optional
  isDeleted: Boolean,        // Default: false
  isActive: String,          // 'Active' or 'Inactive' (default: 'Active')
  isVerified: Boolean,       // Default: false
  createdAt: Date,           // Auto timestamp
  updatedAt: Date            // Auto timestamp
}
```

**Example Data:**
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  password: "$2b$10$...", // bcryptjs hashed
  role: "User",
  phone: "01912345678",
  address: "123 Main St, Dhaka",
  isActive: "Active",
  isVerified: true
}
```

---

### **2. TOURS COLLECTION**
**File:** `g:\tour\back\src\app\tour\tour.model.ts`

```javascript
{
  _id: ObjectId,
  slug: String,              // Required, unique, lowercase
  title: String,             // Required
  description: String,       // Required
  images: [String],          // Array of image URLs
  location: String,          // Required
  costFrom: Number,          // Required, min: 0
  startDate: Date,           // Required
  endDate: Date,             // Required
  tourType: ObjectId,        // Reference to TourType collection
  included: [String],        // Array: "Hotel", "Transport", etc
  excluded: [String],        // Array: "Meals", "Activities", etc
  amenities: [String],       // Array: "WiFi", "AC", "Pool", etc
  tourPlan: [String],        // Array of day-by-day plans
  isDeleted: Boolean,        // Default: false
  createdAt: Date,
  updatedAt: Date
}
```

**Example Data:**
```javascript
{
  slug: "paris-city-tour-2024",
  title: "Paris City Tour",
  description: "Explore the beauty of Paris...",
  images: ["paris1.jpg", "paris2.jpg"],
  location: "Paris, France",
  costFrom: 1500,
  startDate: Date("2024-06-01"),
  endDate: Date("2024-06-07"),
  tourType: ObjectId("..."), // References TourType
  included: ["Hotel", "Transport", "Guide"],
  excluded: ["Meals"],
  amenities: ["WiFi", "AC", "Breakfast"],
  tourPlan: ["Day 1: Arrival", "Day 2: Eiffel Tower", ...]
}
```

---

### **3. TOUR TYPES COLLECTION**
**File:** `g:\tour\back\src\app\tour\tour-type.model.ts`

```javascript
{
  _id: ObjectId,
  name: String,              // Required: "Adventure", "Beach", "Cultural"
  description: String,       // Optional
  isDeleted: Boolean,        // Default: false
  createdAt: Date,
  updatedAt: Date
}
```

**Example Data:**
```javascript
{
  name: "Beach Resort",
  description: "Relaxing beach vacation tours"
}
```

---

### **4. BOOKINGS COLLECTION**
**File:** `g:\tour\back\src\app\booking\booking.model.ts`

```javascript
{
  _id: ObjectId,
  user: ObjectId,            // Reference to Users
  tour: ObjectId,            // Reference to Tours
  guestCount: Number,        // Required, min: 1
  phone: String,             // Required
  address: String,           // Required
  status: String,            // "Pending", "Completed", or "Cancelled"
  payment: ObjectId,         // Reference to Payments (optional)
  createdAt: Date,
  updatedAt: Date
}
```

**Example Data:**
```javascript
{
  user: ObjectId("..."),     // John Doe's ID
  tour: ObjectId("..."),     // Paris City Tour ID
  guestCount: 2,
  phone: "01912345678",
  address: "123 Main St, Dhaka",
  status: "Pending"
}
```

---

### **5. PAYMENTS COLLECTION**
**File:** `g:\tour\back\src\app\booking\payment.model.ts`

```javascript
{
  _id: ObjectId,
  booking: ObjectId,         // Reference to Bookings
  amount: Number,            // Payment amount
  status: String,            // "Pending", "Completed", "Failed"
  paymentMethod: String,     // "Card", "Cash", "Bank Transfer"
  transactionId: String,     // Unique transaction identifier
  createdAt: Date,
  updatedAt: Date
}
```

**Example Data:**
```javascript
{
  booking: ObjectId("..."),  // Booking ID
  amount: 3000,              // 2 guests × 1500
  status: "Completed",
  paymentMethod: "Card",
  transactionId: "TXN123456789"
}
```

---

## 🔄 DATA FLOW DIAGRAMS

### **REGISTRATION FLOW**
```
User Registration Form (Frontend)
           ↓
    Register.tsx
           ↓
    AuthContext.tsx → register()
           ↓
    API Client → POST /users/register
           ↓
    user.route.ts → registerUser endpoint
           ↓
    user.controller.ts → registerUser function
           ↓
    Bcryptjs → Hash password
           ↓
    user.model.ts → Save to Users collection
           ↓
    MongoDB Atlas ✅ Data Saved
```

**API Endpoint:** `POST http://localhost:5000/api/v1/users/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "01912345678",
  "address": "123 Main St"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "ObjectId",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### **LOGIN FLOW**
```
User Login Form (Frontend)
           ↓
    Login.tsx
           ↓
    AuthContext.tsx → login()
           ↓
    API Client → POST /users/login
           ↓
    user.route.ts → loginUser endpoint
           ↓
    user.controller.ts → loginUser function
           ↓
    Find user in MongoDB
           ↓
    Compare password with bcryptjs
           ↓
    Generate JWT Token
           ↓
    Return token to frontend ✅
           ↓
    Store in localStorage (browser)
           ↓
    Axios Interceptor adds to headers
```

**API Endpoint:** `POST http://localhost:5000/api/v1/users/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "_id": "ObjectId",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### **FETCH TOURS FLOW**
```
Home.tsx → Load page
           ↓
    TourContext.tsx → fetchTours()
           ↓
    API Client → GET /tours
           ↓
    tour.route.ts → getAllTours endpoint
           ↓
    tour.controller.ts → getAllTours function
           ↓
    MongoDB Query → Find all tours
           ↓
    Populate tourType reference
           ↓
    Return tours data
           ↓
    TourContext setState
           ↓
    Display in Home.tsx ✅
```

**API Endpoint:** `GET http://localhost:5000/api/v1/tours?skip=0&limit=10`

**Response:**
```json
{
  "tours": [
    {
      "_id": "ObjectId",
      "title": "Paris City Tour",
      "location": "Paris, France",
      "costFrom": 1500,
      "tourType": {
        "_id": "ObjectId",
        "name": "Beach Resort"
      }
    }
  ],
  "total": 25
}
```

---

### **BOOKING CREATION FLOW**
```
TourDetail.tsx → Booking Form
           ↓
    User clicks "Book Now"
           ↓
    Check if user logged in
           ↓
    API Client → POST /bookings
           ↓
    booking.route.ts → createBooking endpoint
           ↓
    booking.controller.ts → createBooking function
           ↓
    Validate user & tour exist
           ↓
    booking.model.ts → Save booking
           ↓
    Create payment record
           ↓
    MongoDB saves both
           ↓
    Return success message ✅
```

**API Endpoint:** `POST http://localhost:5000/api/v1/bookings`

**Request Body:**
```json
{
  "user": "ObjectId",
  "tour": "ObjectId",
  "guestCount": 2,
  "phone": "01912345678",
  "address": "123 Main St"
}
```

**Response:**
```json
{
  "message": "Booking created successfully",
  "booking": {
    "_id": "ObjectId",
    "user": "ObjectId",
    "tour": "ObjectId",
    "guestCount": 2,
    "status": "Pending"
  }
}
```

---

## 📱 COMPLETE API ENDPOINTS

### **USER ENDPOINTS**
```
POST   /api/v1/users/register          → Register new user
POST   /api/v1/users/login             → Login user
GET    /api/v1/users/profile           → Get user profile (requires auth)
GET    /api/v1/users                   → Get all users (admin)
GET    /api/v1/users/:id               → Get user by ID
PUT    /api/v1/users/:id               → Update user (admin)
DELETE /api/v1/users/:id               → Delete user (admin)
```

### **TOUR ENDPOINTS**
```
GET    /api/v1/tours                   → Get all tours
GET    /api/v1/tours/:id               → Get tour by ID
GET    /api/v1/tours/slug/:slug        → Get tour by slug
GET    /api/v1/tours/search?q=query    → Search tours
POST   /api/v1/tours                   → Create tour (admin)
PUT    /api/v1/tours/:id               → Update tour (admin)
DELETE /api/v1/tours/:id               → Delete tour (admin)
GET    /api/v1/tours/types             → Get all tour types
```

### **BOOKING ENDPOINTS**
```
POST   /api/v1/bookings                → Create booking
GET    /api/v1/bookings                → Get all bookings (admin)
GET    /api/v1/bookings/:id            → Get booking by ID
GET    /api/v1/bookings/user/:userId   → Get user bookings
PUT    /api/v1/bookings/:id            → Update booking (admin)
POST   /api/v1/bookings/:id/cancel     → Cancel booking
```

### **PAYMENT ENDPOINTS**
```
POST   /api/v1/bookings/payment        → Create payment
GET    /api/v1/bookings/payment/:id    → Get payment by ID
PUT    /api/v1/bookings/payment/:id/status → Update payment status
```

---

## 🔐 DATABASE RELATIONSHIPS

```
Users (1) ──────── (Many) Bookings
  │                    │
  │                    └── (1) Payments
  │
  └──── Token Storage (localStorage)

Tours (1) ──────── (Many) Bookings
  │
  ├── (1) TourType
  │
  └── (Many) Images
```

**Relationship Rules:**
- 1 User can have MANY Bookings ✅
- 1 Tour can have MANY Bookings ✅
- 1 Booking has 1 Payment ✅
- 1 Tour has 1 TourType ✅

---

## 🛡️ AUTHENTICATION & SECURITY

### **Password Security**
- **Algorithm:** Bcryptjs with 10 salt rounds
- **Storage:** Hashed in database (never plain text)
- **Comparison:** Bcryptjs compare on login

### **Token Security**
- **Type:** JWT (JSON Web Token)
- **Secret:** Stored in `.env` as `JWT_SECRET`
- **Expiration:** 7 days (configurable)
- **Storage:** localStorage in browser
- **Headers:** Added by Axios interceptor on every API call

### **Token Verification**
```
Request with token
           ↓
    Axios Interceptor adds to header
           ↓
    Backend middleware verifies token
           ↓
    If valid → Allow access ✅
    If invalid → Return 401 Unauthorized ❌
```

---

## 🗂️ FILE STRUCTURE REFERENCE

```
g:\tour\
├── back/                                    ← Backend
│   ├── src/
│   │   ├── app.ts                          ← Express app & routes setup
│   │   ├── server.ts                       ← Server entry point
│   │   ├── app/
│   │   │   ├── config/
│   │   │   │   ├── database.ts            ← MongoDB connection
│   │   │   │   └── env.ts                 ← Environment variables
│   │   │   ├── user/
│   │   │   │   ├── user.model.ts          ← Users schema
│   │   │   │   ├── user.interface.ts      ← TypeScript interfaces
│   │   │   │   ├── user.controller.ts     ← Login/Register logic
│   │   │   │   └── user.route.ts          ← User endpoints
│   │   │   ├── tour/
│   │   │   │   ├── tour.model.ts          ← Tours schema
│   │   │   │   ├── tour-type.model.ts     ← TourType schema
│   │   │   │   ├── tour.controller.ts     ← Tour logic
│   │   │   │   └── tour.route.ts          ← Tour endpoints
│   │   │   └── booking/
│   │   │       ├── booking.model.ts       ← Bookings schema
│   │   │       ├── payment.model.ts       ← Payments schema
│   │   │       ├── booking.controller.ts  ← Booking logic
│   │   │       └── booking.route.ts       ← Booking endpoints
│   │   └── ...
│   ├── .env                                ← MongoDB connection string
│   ├── package.json
│   └── ...
│
├── front/
│   └── tour_front/                         ← Frontend (React)
│       ├── src/
│       │   ├── api/
│       │   │   └── client.ts              ← Axios API calls
│       │   ├── context/
│       │   │   ├── AuthContext.tsx        ← Login/Register state
│       │   │   └── TourContext.tsx        ← Tours data state
│       │   ├── pages/
│       │   │   ├── Login.tsx              ← Login page
│       │   │   ├── Register.tsx           ← Register page
│       │   │   ├── Home.tsx               ← Tours listing
│       │   │   ├── TourDetail.tsx         ← Tour detail & booking
│       │   │   └── MyBookings.tsx         ← User bookings
│       │   ├── components/
│       │   │   ├── Navbar.tsx             ← Navigation
│       │   │   └── TourCard.tsx           ← Tour card
│       │   ├── App.jsx                    ← Main app with routing
│       │   └── ...
│       └── ...
└── DATABASE_AND_DATAFLOW.md               ← This file
```

---

## 🚀 HOW TO VIEW YOUR DATA

### **Option 1: MongoDB Compass (GUI)**
1. Download MongoDB Compass
2. Paste connection string:
   ```
   mongodb+srv://iftakhar01755_db_user:aiwMvYdV6arT1FMN@cluster0.vodmaws.mongodb.net/?retryWrites=true&w=majority
   ```
3. Click "Connect"
4. See database `cluster0` with all collections

### **Option 2: MongoDB Atlas Web**
1. Go to mongodb.com/cloud/atlas
2. Login with your account
3. View collections in web dashboard

### **Option 3: MongoDB Shell**
```bash
# Install mongosh: https://www.mongodb.com/docs/mongosh/install/

mongosh "mongodb+srv://iftakhar01755_db_user:aiwMvYdV6arT1FMN@cluster0.vodmaws.mongodb.net/?retryWrites=true&w=majority"

# Inside shell:
show databases
use cluster0
show collections
db.users.find()
db.tours.find()
db.bookings.find()
```

---

## 📊 DATA FLOW EXAMPLE: Complete User Journey

### **Step 1: User Registers**
```
Frontend: User fills register form
          ↓
Backend: POST /users/register
          ↓
Database: Users collection → Add new user with hashed password
```

### **Step 2: User Logs In**
```
Frontend: User enters email & password
          ↓
Backend: POST /users/login
          ↓
Database: Query Users collection by email
          ↓
Backend: Compare password, generate JWT token
          ↓
Frontend: Store token in localStorage
```

### **Step 3: User Views Tours**
```
Frontend: Home page loads
          ↓
Backend: GET /tours
          ↓
Database: Tours collection → Get all tours with TourType populated
          ↓
Frontend: Display tours in grid
```

### **Step 4: User Books a Tour**
```
Frontend: Click "Book Now" on tour detail
          ↓
Backend: POST /bookings (with JWT token)
          ↓
Backend: Verify user is authenticated
          ↓
Database: 
  ├─ Bookings collection → Add new booking
  └─ Payments collection → Add payment record
          ↓
Frontend: Show confirmation message
          ↓
Frontend: Show booking in "My Bookings" page
```

---

## ✅ SUMMARY

**Your Database:**
- **Type:** MongoDB (NoSQL)
- **Location:** Cloud (MongoDB Atlas)
- **Collections:** 5 (Users, Tours, TourTypes, Bookings, Payments)
- **Total Fields:** 50+
- **Relationships:** 4 (Users→Bookings, Tours→Bookings, Tours→TourTypes, Bookings→Payments)

**Your Data Flow:**
1. Frontend (React) → Axios API calls
2. Backend (Express) → Processes requests
3. Database (MongoDB) → Stores/retrieves data
4. Backend → Returns response
5. Frontend → Updates UI

**Everything is connected and working! 🎉**
