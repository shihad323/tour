# Tour Management API - Example Requests

Use these example requests to test the Tour Management API. You can use Postman, Insomnia, or curl.

## Base URL
```
http://localhost:5000/api/v1
```

---

## USER ENDPOINTS

### 1. Register User
```http
POST /users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "address": "123 Main Street, City, Country"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "673abc123def456",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User",
    "phone": "+1234567890",
    "address": "123 Main Street, City, Country",
    "isActive": "Active",
    "isVerified": false,
    "isDeleted": false,
    "auths": [],
    "createdAt": "2024-12-03T10:30:00Z"
  }
}
```

### 2. Login User
```http
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "673abc123def456",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "User"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Get All Users (Admin)
```http
GET /users?skip=0&limit=10
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "users": [
    {
      "_id": "673abc123def456",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "User",
      "isActive": "Active"
    }
  ],
  "total": 1
}
```

### 4. Get User by ID
```http
GET /users/{userId}
Authorization: Bearer {token}
```

### 5. Update User
```http
PUT /users/{userId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "phone": "+9876543210",
  "address": "456 New Avenue"
}
```

### 6. Delete User (Soft Delete)
```http
DELETE /users/{userId}
Authorization: Bearer {token}
```

---

## TOUR TYPE ENDPOINTS

### 1. Create Tour Type (Admin)
```http
POST /tours/types
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Adventure"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "673abc123def789",
    "name": "Adventure",
    "createdAt": "2024-12-03T10:30:00Z"
  }
}
```

### 2. Get All Tour Types
```http
GET /tours/types
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "673abc123def789",
      "name": "Adventure"
    },
    {
      "_id": "673abc123def790",
      "name": "Leisure"
    }
  ]
}
```

---

## TOUR ENDPOINTS

### 1. Create Tour (Admin)
```http
POST /tours
Authorization: Bearer {token}
Content-Type: application/json

{
  "slug": "bali-adventure",
  "title": "Bali Adventure Tour",
  "description": "Experience the exotic beauty of Bali with our comprehensive 5-day tour package.",
  "images": [
    "https://example.com/bali1.jpg",
    "https://example.com/bali2.jpg"
  ],
  "location": "Bali, Indonesia",
  "costFrom": 1200,
  "startDate": "2024-12-15T00:00:00Z",
  "endDate": "2024-12-20T00:00:00Z",
  "tourType": "673abc123def789",
  "included": [
    "Airport transfers",
    "Accommodation",
    "Breakfast & Dinner",
    "Tour guide",
    "Insurance"
  ],
  "excluded": [
    "Lunch",
    "Personal expenses",
    "Visa fees"
  ],
  "amenities": [
    "Swimming Pool",
    "WiFi",
    "Air Conditioning",
    "Restaurant",
    "Spa"
  ],
  "tourPlan": [
    "Day 1: Arrive in Bali, check-in hotel, evening beach walk",
    "Day 2: Visit Ubud temples and rice terraces",
    "Day 3: Volcanic hike and sunrise",
    "Day 4: Beach day and water sports",
    "Day 5: Shopping and departure"
  ]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "673abc123def891",
    "slug": "bali-adventure",
    "title": "Bali Adventure Tour",
    "description": "Experience the exotic beauty of Bali...",
    "images": [...],
    "location": "Bali, Indonesia",
    "costFrom": 1200,
    "startDate": "2024-12-15T00:00:00Z",
    "endDate": "2024-12-20T00:00:00Z",
    "tourType": {
      "_id": "673abc123def789",
      "name": "Adventure"
    },
    "included": [...],
    "excluded": [...],
    "amenities": [...],
    "tourPlan": [...]
  }
}
```

### 2. Get All Tours
```http
GET /tours?skip=0&limit=10
```

### 3. Get Tour by ID
```http
GET /tours/{tourId}
```

### 4. Get Tour by Slug
```http
GET /tours/slug/bali-adventure
```

### 5. Search Tours
```http
GET /tours/search?q=bali&skip=0&limit=10
```

### 6. Update Tour (Admin)
```http
PUT /tours/{tourId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "costFrom": 1300,
  "amenities": ["Swimming Pool", "WiFi", "Gym", "Restaurant"]
}
```

### 7. Delete Tour (Admin)
```http
DELETE /tours/{tourId}
Authorization: Bearer {token}
```

---

## BOOKING ENDPOINTS

### 1. Create Booking
```http
POST /bookings
Authorization: Bearer {token}
Content-Type: application/json

{
  "user": "673abc123def456",
  "tour": "673abc123def891",
  "guestCount": 2,
  "phone": "+1234567890",
  "address": "123 Main Street, City"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "673abc123def992",
    "user": {
      "_id": "673abc123def456",
      "name": "John Doe"
    },
    "tour": {
      "_id": "673abc123def891",
      "title": "Bali Adventure Tour"
    },
    "guestCount": 2,
    "phone": "+1234567890",
    "address": "123 Main Street, City",
    "status": "Pending",
    "createdAt": "2024-12-03T10:30:00Z"
  }
}
```

### 2. Get All Bookings (Admin)
```http
GET /bookings?skip=0&limit=10
Authorization: Bearer {token}
```

### 3. Get User's Bookings
```http
GET /bookings/user/{userId}?skip=0&limit=10
Authorization: Bearer {token}
```

### 4. Get Booking by ID
```http
GET /bookings/{bookingId}
Authorization: Bearer {token}
```

### 5. Update Booking
```http
PUT /bookings/{bookingId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "guestCount": 3,
  "phone": "+9876543210"
}
```

### 6. Cancel Booking
```http
POST /bookings/{bookingId}/cancel
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "673abc123def992",
    "status": "Cancelled",
    "payment": {
      "status": "Refunded"
    }
  }
}
```

---

## PAYMENT ENDPOINTS

### 1. Create Payment
```http
POST /bookings/payment
Authorization: Bearer {token}
Content-Type: application/json

{
  "booking": "673abc123def992",
  "transactionId": "TXN20241203001",
  "amount": 2400,
  "paymentGatewayData": {
    "gateway": "stripe",
    "chargeId": "ch_1234567890"
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "673abc123def993",
    "booking": "673abc123def992",
    "transactionId": "TXN20241203001",
    "status": "Paid",
    "amount": 2400,
    "createdAt": "2024-12-03T10:35:00Z"
  }
}
```

### 2. Get Payment by ID
```http
GET /bookings/payment/{paymentId}
Authorization: Bearer {token}
```

### 3. Update Payment Status
```http
PUT /bookings/payment/{paymentId}/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "Paid"
}
```

---

## ERROR RESPONSES

### 400 Bad Request
```json
{
  "success": false,
  "message": "Email already exists"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Tour not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## TESTING WORKFLOW

1. **Register a user** - Create a new account
2. **Login** - Get JWT token
3. **Create tour types** - Create at least one type (as admin)
4. **Create tours** - Add sample tours (as admin)
5. **Search tours** - Test search functionality
6. **Get tour details** - View specific tour
7. **Create booking** - Book a tour
8. **Create payment** - Process payment
9. **View bookings** - Check user's bookings
10. **Cancel booking** - Test cancellation

---

## TIPS

- Always include `Authorization: Bearer {token}` header for protected routes
- Use the token returned from login endpoint
- Remember to replace `{userId}`, `{tourId}`, `{bookingId}`, etc. with actual IDs
- For testing, you can use Postman, Insomnia, or VS Code Rest Client extension
- Check MongoDB to verify data is being stored correctly

---

**Last Updated:** December 3, 2024
