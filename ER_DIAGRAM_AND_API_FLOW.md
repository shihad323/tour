# Database Entity Relationship Diagram

## COMPLETE COLLECTION OVERVIEW

```
┌─────────────────────────────────────────────────────────────────┐
│                         MONGODB ATLAS                            │
│                      (Cloud Database)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    USERS COLLECTION                      │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │  _id: ObjectId                                           │   │
│  │  name: String                                            │   │
│  │  email: String (unique)                                  │   │
│  │  password: String (hashed)                               │   │
│  │  role: String (Admin / User)                             │   │
│  │  phone: String                                           │   │
│  │  picture: String                                         │   │
│  │  address: String                                         │   │
│  │  isActive: String (Active / Inactive)                    │   │
│  │  isVerified: Boolean                                     │   │
│  │  isDeleted: Boolean                                      │   │
│  └──────────────────────────────────────────────────────────┘   │
│                             ▲                                     │
│                             │ (1 to Many)                        │
│                             │                                     │
│  ┌──────────────────────────┼──────────────────────────────┐   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │                BOOKINGS COLLECTION               │   │   │
│  │  ├──────────────────────────────────────────────────┤   │   │
│  │  │  _id: ObjectId                                   │   │   │
│  │  │  user: ObjectId (ref to Users)  ─────────────┐   │   │   │
│  │  │  tour: ObjectId (ref to Tours)  ─────────┐   │   │   │   │
│  │  │  guestCount: Number (min: 1)             │   │   │   │   │
│  │  │  phone: String                           │   │   │   │   │
│  │  │  address: String                         │   │   │   │   │
│  │  │  status: String (Pending/Completed)      │   │   │   │   │
│  │  │  payment: ObjectId (ref to Payments) ┐   │   │   │   │   │
│  │  │  createdAt: Date                    │   │   │   │   │   │
│  │  │  updatedAt: Date                    │   │   │   │   │   │
│  │  └──────────────────────────────────────┼───┼───┼───┼───┘   │
│  │                                         │   │   │   │       │
│  └─────────────────────────────────────────│───┼───┼───┘       │
│                                            │   │   │           │
│  ┌────────────────────────────────────────┼───┼───┼────────┐   │
│  │  ┌───────────────────────────────┐     │   │   │        │   │
│  │  │   PAYMENTS COLLECTION         │     │   │   │        │   │
│  │  ├───────────────────────────────┤     │   │   │        │   │
│  │  │  _id: ObjectId                │◄────┘   │   │        │   │
│  │  │  booking: ObjectId            │         │   │        │   │
│  │  │  amount: Number               │         │   │        │   │
│  │  │  status: String               │         │   │        │   │
│  │  │  paymentMethod: String        │         │   │        │   │
│  │  │  transactionId: String        │         │   │        │   │
│  │  │  createdAt: Date              │         │   │        │   │
│  │  │  updatedAt: Date              │         │   │        │   │
│  │  └───────────────────────────────┘         │   │        │   │
│  │                                            │   │        │   │
│  └────────────────────────────────────────────┼───┼────────┘   │
│                                               │   │            │
│  ┌────────────────────────────────────────────┘   │            │
│  │  ┌──────────────────────────────────────────────┼────────┐   │
│  │  │          TOURS COLLECTION                    │        │   │
│  │  ├────────────────────────────────────────────────────────┤   │
│  │  │  _id: ObjectId                                         │   │
│  │  │  slug: String (unique)                                 │   │
│  │  │  title: String                                         │   │
│  │  │  description: String                                   │   │
│  │  │  images: [String]                                      │   │
│  │  │  location: String                                      │   │
│  │  │  costFrom: Number                                      │   │
│  │  │  startDate: Date                                       │   │
│  │  │  endDate: Date                                         │   │
│  │  │  tourType: ObjectId (ref to TourTypes)  ───────────┐   │   │
│  │  │  included: [String]                                │   │   │
│  │  │  excluded: [String]                                │   │   │
│  │  │  amenities: [String]                               │   │   │
│  │  │  tourPlan: [String]                                │   │   │
│  │  │  isDeleted: Boolean                                │   │   │
│  │  └────────────────────────────────────────────────────┼───┘   │
│  └──────────────────────────────────────────────────────┘       │
│                                                      │            │
│  ┌───────────────────────────────────────────────────┼────────┐  │
│  │          TOUR TYPES COLLECTION                   │        │  │
│  ├──────────────────────────────────────────────────┼────────┤  │
│  │  _id: ObjectId  ◄─────────────────────────────────┘        │  │
│  │  name: String                                               │  │
│  │  description: String                                        │  │
│  │  isDeleted: Boolean                                         │  │
│  │  createdAt: Date                                            │  │
│  │  updatedAt: Date                                            │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Relationship Summary Table

| Relationship | From | To | Type | Example |
|---|---|---|---|---|
| **User Bookings** | Users | Bookings | 1 to Many | 1 user can have many bookings |
| **Tour Bookings** | Tours | Bookings | 1 to Many | 1 tour can have many bookings |
| **Booking Payment** | Bookings | Payments | 1 to 1 | 1 booking has 1 payment |
| **Tour Type** | TourTypes | Tours | 1 to Many | 1 tour type has many tours |

## Data Query Flow

```
┌─────────────────────────────────────┐
│     FRONTEND (React Component)       │
│  - Home.tsx                          │
│  - TourDetail.tsx                    │
│  - MyBookings.tsx                    │
└────────────────┬────────────────────┘
                 │
                 ▼
         ┌───────────────────┐
         │   Axios Client    │
         │  - API Base URL   │
         │  - JWT Header     │
         │  - Interceptors   │
         └────────┬──────────┘
                  │
                  ▼
    ┌─────────────────────────────────┐
    │  EXPRESS BACKEND (Node.js)      │
    │  Port: 5000                     │
    │                                 │
    │  ┌───────────────────────────┐  │
    │  │   Route Handler           │  │
    │  │ - user.route.ts           │  │
    │  │ - tour.route.ts           │  │
    │  │ - booking.route.ts        │  │
    │  └────────┬──────────────────┘  │
    │           │                     │
    │           ▼                     │
    │  ┌───────────────────────────┐  │
    │  │   Controller Logic        │  │
    │  │ - user.controller.ts      │  │
    │  │ - tour.controller.ts      │  │
    │  │ - booking.controller.ts   │  │
    │  └────────┬──────────────────┘  │
    │           │                     │
    │           ▼                     │
    │  ┌───────────────────────────┐  │
    │  │   Middleware              │  │
    │  │ - JWT Verification        │  │
    │  │ - Validation              │  │
    │  │ - Error Handling          │  │
    │  └────────┬──────────────────┘  │
    └───────────┼──────────────────────┘
                │
                ▼
    ┌────────────────────────────────┐
    │   Mongoose ODM                 │
    │  - Schema Validation           │
    │  - Relationship Handling       │
    │  - Query Building              │
    └───────────┬────────────────────┘
                │
                ▼
    ┌────────────────────────────────┐
    │   MONGODB CONNECTION           │
    │  mongodb+srv://...             │
    │  (Atlas Cloud)                 │
    └───────────┬────────────────────┘
                │
                ▼
    ┌────────────────────────────────┐
    │   MONGODB ATLAS (Cloud DB)     │
    │                                │
    │  Collections:                  │
    │  ├─ users                      │
    │  ├─ tours                      │
    │  ├─ tourTypes                  │
    │  ├─ bookings                   │
    │  └─ payments                   │
    └────────────────────────────────┘
```

## API Request/Response Cycle

```
1. REGISTRATION
   ┌──────────────────────────────────────────────┐
   │ Frontend: Register.tsx                       │
   │ Form Fields: name, email, password, phone    │
   └──────────────┬───────────────────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────────────────┐
   │ POST /api/v1/users/register                  │
   │ Headers: Content-Type: application/json      │
   └──────────────┬───────────────────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────────────────┐
   │ Backend: user.controller.registerUser()      │
   │ 1. Validate input                            │
   │ 2. Hash password with bcryptjs               │
   │ 3. Create user document                      │
   │ 4. Save to Users collection                  │
   └──────────────┬───────────────────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────────────────┐
   │ Database: Users collection                   │
   │ Insert: {name, email, hashedPassword, ...}   │
   └──────────────┬───────────────────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────────────────┐
   │ Response: 201 Created                        │
   │ {message: "User registered successfully"}    │
   └──────────────────────────────────────────────┘


2. LOGIN
   ┌──────────────────────────────────────────────┐
   │ Frontend: Login.tsx                          │
   │ Form Fields: email, password                 │
   └──────────────┬───────────────────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────────────────┐
   │ POST /api/v1/users/login                     │
   │ Headers: Content-Type: application/json      │
   └──────────────┬───────────────────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────────────────┐
   │ Backend: user.controller.loginUser()         │
   │ 1. Find user by email in DB                  │
   │ 2. Compare password with hash                │
   │ 3. Generate JWT token                        │
   │ 4. Return token and user data                │
   └──────────────┬───────────────────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────────────────┐
   │ Response: 200 OK                             │
   │ {token: "eyJ...", user: {...}}               │
   └──────────────┬───────────────────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────────────────┐
   │ Frontend: AuthContext stores token           │
   │ localStorage.setItem("token", token)         │
   │ Axios interceptor adds to all requests       │
   └──────────────────────────────────────────────┘


3. FETCH TOURS
   ┌──────────────────────────────────────────────┐
   │ Frontend: Home.tsx useEffect()               │
   │ Call: TourContext.fetchTours()               │
   └──────────────┬───────────────────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────────────────┐
   │ GET /api/v1/tours?skip=0&limit=10            │
   │ Headers: Authorization: Bearer {token}       │
   └──────────────┬───────────────────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────────────────┐
   │ Backend: tour.controller.getAllTours()       │
   │ 1. Verify JWT token                         │
   │ 2. Query Tours collection with pagination    │
   │ 3. Populate tourType reference               │
   │ 4. Return tours array                        │
   └──────────────┬───────────────────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────────────────┐
   │ Database Query:                              │
   │ db.tours.find()                              │
   │   .skip(0)                                   │
   │   .limit(10)                                 │
   │   .populate('tourType')                      │
   └──────────────┬───────────────────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────────────────┐
   │ Response: 200 OK                             │
   │ {tours: [...], total: 25}                    │
   └──────────────┬───────────────────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────────────────┐
   │ Frontend: Display tours in grid              │
   │ TourContext.setTours(tours)                  │
   │ Map tours to TourCard components             │
   └──────────────────────────────────────────────┘


4. BOOK A TOUR
   ┌──────────────────────────────────────────────┐
   │ Frontend: TourDetail.tsx                     │
   │ Form: guestCount, phone, address             │
   └──────────────┬───────────────────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────────────────┐
   │ POST /api/v1/bookings                        │
   │ Body: {user, tour, guestCount, phone, ...}   │
   │ Headers: Authorization: Bearer {token}       │
   └──────────────┬───────────────────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────────────────┐
   │ Backend: booking.controller.createBooking()  │
   │ 1. Verify JWT & extract user ID              │
   │ 2. Validate user & tour exist in DB          │
   │ 3. Create booking document                   │
   │ 4. Create payment document                   │
   │ 5. Save both to collections                  │
   └──────────────┬───────────────────────────────┘
                  │
                  ├──────────────┬────────────────┤
                  ▼              ▼                ▼
   ┌──────────────────────┐ ┌──────────────────┐
   │ Bookings Collection  │ │ Payments Coll.   │
   │ Insert:              │ │ Insert:          │
   │ {user, tour,         │ │ {booking,        │
   │  guestCount,         │ │  amount,         │
   │  status: Pending}    │ │  status: Pending}│
   └──────────┬───────────┘ └────────┬─────────┘
              │                      │
              └──────────┬───────────┘
                         │
                         ▼
   ┌──────────────────────────────────────────────┐
   │ Response: 201 Created                        │
   │ {booking: {...}, payment: {...}}             │
   └──────────────────────────────────────────────┘
```

## MongoDB Query Examples

```javascript
// Find all users
db.users.find({})

// Find user by email (used during login)
db.users.findOne({ email: "john@example.com" })

// Find all tours with tour type populated
db.tours.find({})
  .populate('tourType')

// Find bookings for a specific user
db.bookings.find({ user: ObjectId("...") })
  .populate('user')
  .populate('tour')
  .populate('payment')

// Find all payments for completed bookings
db.payments.find({ status: "Completed" })

// Count total tours in database
db.tours.countDocuments({})

// Search tours by location
db.tours.find({ location: { $regex: "Paris", $options: "i" } })
```

## Your Complete Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND                             │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  React 19.1.1                                    │  │
│  │  - Home, TourDetail, MyBookings, Login, Register │  │
│  │  - Navbar, TourCard components                   │  │
│  └──────────────────────────────────────────────────┘  │
│                         ▲                               │
│  ┌──────────────────────┴──────────────────────────┐  │
│  │  Vite 7.1.12 Build Tool                         │  │
│  │  Tailwind CSS v4 + @tailwindcss/vite 4.1.16     │  │
│  │  React Router v7                                │  │
│  │  Axios API Client                               │  │
│  │  React Context API (Auth & Tours)               │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
                         │
                         │ HTTP/REST
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    BACKEND                              │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Express.js 5.1.0 (Node.js)                      │  │
│  │  TypeScript 5.9.3                                │  │
│  │  - User Routes/Controller                        │  │
│  │  - Tour Routes/Controller                        │  │
│  │  - Booking Routes/Controller                     │  │
│  └──────────────────────────────────────────────────┘  │
│                         ▲                               │
│  ┌──────────────────────┴──────────────────────────┐  │
│  │  Authentication & Middleware                    │  │
│  │  - JWT Token Verification                       │  │
│  │  - Bcryptjs Password Hashing                    │  │
│  │  - Error Handling                               │  │
│  │  - CORS Configuration                           │  │
│  └──────────────────────────────────────────────────┘  │
│                         ▲                               │
│  ┌──────────────────────┴──────────────────────────┐  │
│  │  Mongoose 8.19.3 (ODM)                          │  │
│  │  - User Schema                                  │  │
│  │  - Tour & TourType Schemas                      │  │
│  │  - Booking & Payment Schemas                    │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
                         │
                         │ MongoDB Protocol
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              MONGODB ATLAS (Cloud)                      │
│                                                         │
│  Cluster: cluster0.vodmaws.mongodb.net                  │
│  Database: cluster0                                     │
│                                                         │
│  Collections:                                           │
│  ├─ users (1000s of documents)                         │
│  ├─ tours (100s of documents)                          │
│  ├─ tourtypes (10s of documents)                       │
│  ├─ bookings (1000s of documents)                      │
│  └─ payments (1000s of documents)                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Everything is connected and ready to use! 🚀**
