# 🎨 Visual Guide - Tour Management MERN

## Application Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER BROWSER                              │
│                  (React Frontend)                            │
│  http://localhost:5173                                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ HomePage                                             │  │
│  │ • Hero Section                                       │  │
│  │ • Tour Grid (TourCards)                              │  │
│  │ • Search & Filter                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│           │ Click Tour              │ Login/Register        │
│           ↓                         ↓                       │
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │ TourDetailPage       │  │ LoginPage / RegisterPage     │
│  │ • Tour Info          │  │ • Email/Password form        │
│  │ • Booking Form       │  │ • Validation               │
│  │ • Itinerary          │  │ • Success → localStorage   │
│  └──────────────────────┘  └──────────────────────┘        │
│           │ Book Tour              │ Success              │
│           ↓                         ↓                       │
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │ Send Booking API     │  │ Store Token          │        │
│  │ POST /bookings       │  │ Update Auth State    │        │
│  └──────────────────────┘  └──────────────────────┘        │
│           │                        │                       │
│           ↓                        ↓                       │
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │ Show Success         │  │ Show Navbar          │        │
│  │ Redirect to Bookings │  │ • User Profile       │        │
│  └──────────────────────┘  │ • Logout             │        │
│                             │ • My Bookings Link   │        │
│                             └──────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
                           ↕ HTTP/JSON
            (Axios with JWT Token in Header)
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              API SERVER (Node.js/Express)                   │
│             http://localhost:5000/api/v1                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ REQUEST HANDLING                                     │  │
│  │                                                      │  │
│  │ ┌────────────────────────────────────────────────┐  │  │
│  │ │ User Routes                                    │  │  │
│  │ │ POST /register    →  registerUser()            │  │  │
│  │ │ POST /login       →  loginUser()               │  │  │
│  │ │ GET  /users/:id   →  getUserById()             │  │  │
│  │ └────────────────────────────────────────────────┘  │  │
│  │                                                      │  │
│  │ ┌────────────────────────────────────────────────┐  │  │
│  │ │ Tour Routes                                    │  │  │
│  │ │ GET  /tours           →  getAllTours()         │  │  │
│  │ │ GET  /tours/search    →  searchTours()         │  │  │
│  │ │ GET  /tours/slug/:s   →  getTourBySlug()       │  │  │
│  │ │ GET  /tours/:id       →  getTourById()         │  │  │
│  │ │ POST /tours           →  createTour()          │  │  │
│  │ │ PUT  /tours/:id       →  updateTour()          │  │  │
│  │ │ DELETE /tours/:id     →  deleteTour()          │  │  │
│  │ └────────────────────────────────────────────────┘  │  │
│  │                                                      │  │
│  │ ┌────────────────────────────────────────────────┐  │  │
│  │ │ Booking Routes                                 │  │  │
│  │ │ POST /bookings              →  createBooking()│  │  │
│  │ │ GET  /bookings              →  getAllBookings()│  │  │
│  │ │ GET  /bookings/user/:userId →  getBookingsByUser()│  │
│  │ │ POST /bookings/:id/cancel   →  cancelBooking() │  │  │
│  │ │ POST /bookings/payment      →  createPayment() │  │  │
│  │ └────────────────────────────────────────────────┘  │  │
│  │                                                      │  │
│  │ CONTROLLERS PROCESS REQUEST                         │  │
│  │ • Validate input                                   │  │
│  │ • Query/Update database                            │  │
│  │ • Return JSON response                             │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↕                                 │
│                    DATABASE QUERIES                        │
│                                                            │
└─────────────────────────────────────────────────────────────┘
                           ↕ Mongoose
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              MONGODB DATABASE                               │
│             localhost:27017 / Atlas Cloud                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  users          →  {name, email, password, ...}            │
│  tours          →  {title, location, costFrom, ...}        │
│  tourtypes      →  {name}                                   │
│  bookings       →  {user, tour, guestCount, ...}          │
│  payments       →  {booking, amount, status, ...}          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## State Management Flow

```
Frontend State Management:

┌─────────────────────────────────────────┐
│         AuthContext Provider             │
├─────────────────────────────────────────┤
│ State:                                  │
│  • user (logged-in user info)           │
│  • token (JWT token)                    │
│  • isLoading (during auth)              │
│                                         │
│ Functions:                              │
│  • login()    → API call, set token     │
│  • register() → API call, create user   │
│  • logout()   → Clear state, localStorage│
│  • setUser()  → Update user info        │
│                                         │
│ Used by:                                │
│  • Navbar (show/hide auth buttons)      │
│  • Login/Register pages                 │
│  • Protected pages                      │
│  • API client (inject token)            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         TourContext Provider             │
├─────────────────────────────────────────┤
│ State:                                  │
│  • tours (array of tours)               │
│  • totalTours (pagination)              │
│  • isLoading (during fetch)             │
│  • error (error message)                │
│                                         │
│ Functions:                              │
│  • fetchTours()    → Get all tours      │
│  • searchTours()   → Search tours       │
│  • getTourById()   → Get single tour    │
│  • getTourBySlug() → Get by slug        │
│                                         │
│ Used by:                                │
│  • Home page (display tours)            │
│  • Search functionality                 │
│  • Tour detail page                     │
└─────────────────────────────────────────┘
```

---

## Database Relationship Diagram

```
┌──────────────────┐
│      USER        │
├──────────────────┤
│ _id (PK)         │
│ name             │
│ email            │
│ password         │
│ role             │
│ phone            │
│ picture          │
│ address          │
│ isDeleted        │
│ isActive         │
│ isVerified       │
│ auths[]          │
│ timestamps       │
└────────┬─────────┘
         │
         │ (1:Many)
         │ Foreign Key: user
         │
         ↓
┌──────────────────┐          ┌──────────────────┐
│    BOOKING       │ ────────→│     TOUR         │
├──────────────────┤ (Many:1) ├──────────────────┤
│ _id (PK)         │ tour     │ _id (PK)         │
│ user ──→ USER    │          │ slug             │
│ tour ──→ TOUR    │          │ title            │
│ guestCount       │          │ description      │
│ phone            │          │ images[]         │
│ address          │          │ location         │
│ status           │          │ costFrom         │
│ payment ──→      │          │ startDate        │
│   PAYMENT        │          │ endDate          │
│ timestamps       │          │ tourType ──→     │
└────────┬─────────┘          │   TOURTYPE       │
         │                    │ included[]       │
         │ (1:1)              │ excluded[]       │
         │ Foreign Key:       │ amenities[]      │
         │ payment            │ tourPlan[]       │
         │                    │ isDeleted        │
         ↓                    │ timestamps       │
┌──────────────────┐          └──────────────────┘
│    PAYMENT       │                 ↑
├──────────────────┤                 │
│ _id (PK)         │                 │ (Many:1)
│ booking ──→      │                 │ Foreign Key: tourType
│   BOOKING        │
│ transactionId    │          ┌──────────────────┐
│ status           │          │   TOURTYPE       │
│ amount           │          ├──────────────────┤
│ paymentGateway   │          │ _id (PK)         │
│ invoiceUrl       │          │ name             │
│ timestamps       │          │ (Adventure,      │
└──────────────────┘          │  Leisure, etc)   │
                              │ timestamps       │
                              └──────────────────┘
```

---

## Component Hierarchy

```
App
├── Router
├── AuthProvider
│   └── TourProvider
│       ├── Navbar
│       │   ├── useAuth()
│       │   └── Hamburger Menu
│       │
│       └── Routes
│           ├── / (Home)
│           │   └── Home
│           │       └── TourCard (repeated)
│           │           ├── useNavigate()
│           │           └── Link to /tour/:slug
│           │
│           ├── /login
│           │   └── Login Form
│           │       └── useAuth()
│           │
│           ├── /register
│           │   └── Register Form
│           │       └── useAuth()
│           │
│           ├── /tour/:slug
│           │   └── TourDetail
│           │       ├── useTour()
│           │       ├── useAuth()
│           │       ├── Tour Info Display
│           │       └── Booking Form
│           │
│           └── /bookings
│               └── MyBookings
│                   ├── useAuth()
│                   └── Booking List
│                       ├── Booking Status
│                       ├── Payment Info
│                       └── Cancel Button
```

---

## Request/Response Flow Example

### Example: User Books a Tour

```
FRONTEND
┌─────────────────────────────────────┐
│ User fills booking form on TourDetail
│ • Guest Count: 2
│ • Phone: +1234567890
│ • Address: 123 Main St
│ Clicks "Book Now"
└─────────────────────────────────────┘
            ↓
┌─────────────────────────────────────┐
│ bookingAPI.createBooking(bookingData)
│ Prepares:
│ {
│   "user": "userId",
│   "tour": "tourId",
│   "guestCount": 2,
│   "phone": "+1234567890",
│   "address": "123 Main St"
│ }
└─────────────────────────────────────┘
            ↓
┌─────────────────────────────────────┐
│ Axios POST Request
│ POST /api/v1/bookings
│ Header: Authorization: Bearer {token}
│ Body: {booking data}
└─────────────────────────────────────┘
            ↓ NETWORK ↓
┌─────────────────────────────────────┐
│ BACKEND
│ bookingRoute receives request
│ ↓
│ createBooking (controller)
│ ↓
│ Validates user & tour exist
│ ↓
│ Creates booking document
│ ↓
│ Populates references
│ ↓
│ Returns booking data (201)
└─────────────────────────────────────┘
            ↓ NETWORK ↓
┌─────────────────────────────────────┐
│ FRONTEND Response Handler
│ {
│   "success": true,
│   "data": {
│     "_id": "booking123",
│     "status": "Pending",
│     ...
│   }
│ }
│ ↓
│ Show success message
│ ↓
│ Redirect to /bookings
└─────────────────────────────────────┘
```

---

## Authentication Flow

```
STEP 1: USER REGISTRATION
┌────────────────────────────────────┐
│ Frontend: Register Form            │
│ • Fill name, email, password       │
│ • Submit form                      │
└────────────┬───────────────────────┘
             ↓
┌────────────────────────────────────┐
│ Backend: POST /users/register      │
│ • Validate input                   │
│ • Hash password with bcryptjs      │
│ • Create user document             │
│ • Return user data (201)           │
└────────────┬───────────────────────┘
             ↓
┌────────────────────────────────────┐
│ Frontend: Redirect to Login        │
└────────────────────────────────────┘

STEP 2: USER LOGIN
┌────────────────────────────────────┐
│ Frontend: Login Form               │
│ • Enter email & password           │
│ • Submit form                      │
└────────────┬───────────────────────┘
             ↓
┌────────────────────────────────────┐
│ Backend: POST /users/login         │
│ • Find user by email               │
│ • Compare password with hash       │
│ • If match: Generate JWT token     │
│ • Return user + token (200)        │
│ • If no match: Error (401)         │
└────────────┬───────────────────────┘
             ↓
┌────────────────────────────────────┐
│ Frontend: Response Handler         │
│ • Store token in localStorage      │
│ • Update AuthContext state         │
│ • Redirect to home (/)             │
│ • Show user in Navbar              │
└────────────┬───────────────────────┘
             ↓
STEP 3: AUTHENTICATED REQUESTS
┌────────────────────────────────────┐
│ Frontend: Make API Request         │
│ • Axios interceptor adds token     │
│ • Header: "Authorization: Bearer   │
│           {token}"                 │
│ • Send request                     │
└────────────┬───────────────────────┘
             ↓
┌────────────────────────────────────┐
│ Backend: Verify Token              │
│ • Extract token from header        │
│ • Verify JWT signature             │
│ • If valid: Process request        │
│ • If invalid: Error (401)          │
│ • Extract user ID from token       │
│ • Get user from database           │
│ • Return protected resource        │
└────────────┬───────────────────────┘
             ↓
┌────────────────────────────────────┐
│ Frontend: Use Data                 │
│ • Display booking info             │
│ • Show user data                   │
│ • Update state                     │
└────────────────────────────────────┘

STEP 4: USER LOGOUT
┌────────────────────────────────────┐
│ Frontend: Click Logout             │
│ • AuthContext.logout()             │
│ • Clear localStorage               │
│ • Clear state                      │
│ • Redirect to home                 │
│ • Navbar shows Login button        │
└────────────────────────────────────┘
```

---

## File Write/Update Frequency

```
DURING DEVELOPMENT (Most Frequent)
┌─────────────────────────────────────┐
│ backend/src/                        │
│  ├── app/user/                      │ ← Controllers & Models
│  ├── app/tour/                      │ ← Controllers & Models
│  ├── app/booking/                   │ ← Controllers & Models
│  └── app.ts                         │ ← Routes integration
│                                     │
│ frontend/src/                       │
│  ├── pages/                         │ ← Page logic
│  ├── components/                    │ ← Component logic
│  ├── context/                       │ ← State management
│  └── api/client.ts                  │ ← API changes
└─────────────────────────────────────┘

OCCASIONALLY (Setup & Config)
┌─────────────────────────────────────┐
│ .env files                          │
│ package.json                        │
│ tsconfig.json                       │
└─────────────────────────────────────┘

RARELY (Infrastructure)
┌─────────────────────────────────────┐
│ backend/src/config/                 │
│ frontend/vite.config.ts             │
│ frontend/tsconfig.json              │
└─────────────────────────────────────┘
```

---

**Last Updated:** December 3, 2024
**Visual Guide Version:** 1.0
