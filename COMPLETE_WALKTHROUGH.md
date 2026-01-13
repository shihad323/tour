# 🎬 COMPLETE WALKTHROUGH - From Zero to Working App

## 📺 VISUAL GUIDE: How Everything Works

---

## 🎯 STEP 1: UNDERSTAND YOUR APP STRUCTURE

```
YOUR TOUR APP
├── Backend Server (Port 5000)
│   ├── MongoDB Connection
│   ├── User Authentication
│   ├── Tour Management
│   └── Booking System
│
├── Frontend App (Port 5173)
│   ├── Login/Register Pages
│   ├── Home (Tour List)
│   ├── Tour Details
│   └── My Bookings
│
└── Database (MongoDB Atlas - Cloud)
    ├── 5 Tours
    ├── 3 Users
    ├── 4 Tour Types
    └── Bookings & Payments (user creates)
```

---

## 📊 STEP 2: DATABASE STRUCTURE

### **Users Collection** (3 dummy users)
```json
{
  _id: ObjectId,
  name: "John Doe",
  email: "john@example.com",
  password: "hashed_with_bcryptjs",
  role: "User",
  phone: "01912345678",
  address: "Dhaka, Bangladesh"
}
```

### **Tours Collection** (5 sample tours)
```json
{
  _id: ObjectId,
  title: "Paris City Tour",
  location: "Paris, France",
  costFrom: 1500,
  startDate: "2025-06-01",
  endDate: "2025-06-07",
  tourType: ObjectId (references TourType),
  included: ["Hotel", "Transport", "Guide"],
  images: ["paris1.jpg", "paris2.jpg"]
}
```

### **TourTypes Collection** (4 types)
```
- Beach Resort
- Mountain Trek
- City Tour
- Adventure Sports
```

### **Bookings Collection** (created when user books)
```json
{
  _id: ObjectId,
  user: ObjectId (references User),
  tour: ObjectId (references Tour),
  guestCount: 2,
  phone: "01912345678",
  address: "User Address",
  status: "Pending",
  payment: ObjectId (references Payment)
}
```

---

## 🔐 STEP 3: AUTHENTICATION FLOW

### **REGISTRATION PROCESS**
```
User enters details in form
         ↓
Frontend sends to Backend: POST /users/register
         ↓
Backend validates input
         ↓
Backend hashes password with bcryptjs
         ↓
Backend saves to MongoDB users collection
         ↓
Response sent to frontend
         ↓
User can now login
```

### **LOGIN PROCESS**
```
User enters email and password
         ↓
Frontend sends to Backend: POST /users/login
         ↓
Backend finds user in MongoDB
         ↓
Backend compares hashed password
         ↓
If match: Backend generates JWT token
         ↓
Token sent to frontend
         ↓
Frontend stores in localStorage
         ↓
Axios automatically adds token to all requests
         ↓
User logged in ✅
```

### **PROTECTED REQUESTS**
```
Frontend needs user's bookings
         ↓
GET /bookings/user/:userId
         ↓
Axios adds to header: Authorization: Bearer token
         ↓
Backend verifies token
         ↓
Backend extracts user ID from token
         ↓
Backend queries: bookings where user = ID
         ↓
Returns only THIS user's bookings ✅
```

---

## 🎫 STEP 4: DATA FLOW - BOOKING A TOUR

```
1. USER SEES TOUR ON HOMEPAGE
   ├─ Frontend fetches: GET /tours
   ├─ Backend queries MongoDB tours collection
   ├─ Populates tourType reference
   └─ Shows 5 sample tours on page

2. USER CLICKS "BOOK NOW"
   ├─ Opens booking form modal
   ├─ Pre-fills tour ID from URL
   └─ Asks for: guests, phone, address

3. USER SUBMITS BOOKING
   ├─ Frontend sends: POST /bookings
   ├─ Axios adds token to header
   └─ Sends: {tour, guestCount, phone, address}

4. BACKEND PROCESSES
   ├─ Verifies JWT token is valid
   ├─ Extracts user ID from token
   ├─ Creates booking document
   ├─ Creates payment document
   └─ Saves both to MongoDB

5. RESPONSE TO FRONTEND
   ├─ Returns: {bookingId, status, payment}
   ├─ Shows confirmation message
   └─ Updates "My Bookings" page

6. USER SEES BOOKING
   ├─ Visits "My Bookings" page
   ├─ Frontend queries: GET /bookings/user/:userId
   ├─ Backend filters bookings for this user
   └─ Shows booking with tour details
```

---

## 🎬 COMPLETE USER JOURNEY

### **SCENARIO: New User Books a Tour**

```
STEP 1: ARRIVE AT APP (localhost:5173)
  └─ See login/register buttons
     (Tours page protected, need login)

STEP 2: REGISTER NEW ACCOUNT
  ├─ Click "Register" button
  ├─ Fill form:
  │  ├─ Name: Your Name
  │  ├─ Email: yourname@email.com
  │  ├─ Password: YourPassword123
  │  ├─ Phone: 01912345678
  │  └─ Address: Your Address
  ├─ Click "Register"
  └─ ✅ Account created, stored in MongoDB

STEP 3: LOGIN
  ├─ Click "Login" button
  ├─ Enter:
  │  ├─ Email: yourname@email.com
  │  └─ Password: YourPassword123
  ├─ Click "Login"
  ├─ Backend checks password, generates token
  ├─ Token stored in localStorage
  └─ ✅ Logged in!

STEP 4: VIEW TOURS (HOME PAGE)
  ├─ Frontend loads homepage
  ├─ Fetches: GET /tours
  ├─ Shows 5 dummy tours:
  │  ├─ Paris City Tour ($1500)
  │  ├─ Maldives Beach Resort ($2000)
  │  ├─ Swiss Mountain Trek ($1800)
  │  ├─ Thailand Adventure ($900)
  │  └─ New Zealand Bungee ($600)
  ├─ Each tour card shows:
  │  ├─ Image
  │  ├─ Title
  │  ├─ Location
  │  ├─ Cost
  │  └─ "Book Now" button
  └─ ✅ Tours displayed!

STEP 5: CLICK TOUR DETAILS
  ├─ Click on a tour card
  ├─ See full details:
  │  ├─ Full description
  │  ├─ Included/Excluded
  │  ├─ Amenities
  │  ├─ Day-by-day itinerary
  │  └─ "Book Now" button
  └─ ✅ Viewing tour details

STEP 6: BOOK A TOUR
  ├─ Click "Book Now" button
  ├─ See booking form:
  │  ├─ Number of guests
  │  ├─ Your phone
  │  └─ Your address
  ├─ Fill form (guests: 2)
  ├─ Click "Book Tour"
  ├─ Backend creates booking + payment
  ├─ Database updated
  └─ ✅ Booking confirmed!

STEP 7: VIEW MY BOOKINGS
  ├─ Click "My Bookings" in navbar
  ├─ See your booking:
  │  ├─ Tour name
  │  ├─ Tour dates
  │  ├─ Number of guests
  │  ├─ Booking status (Pending)
  │  └─ Total cost
  └─ ✅ Booking stored in MongoDB!

STEP 8: VERIFY IN DATABASE
  ├─ Open MongoDB Compass
  ├─ View collections:
  │  ├─ users: Your new user
  │  ├─ bookings: Your booking
  │  └─ payments: Payment record
  └─ ✅ Everything in database!
```

---

## 🚀 QUICK START CHECKLIST

### **TERMINAL 1: BACKEND**
```bash
✅ Open terminal in g:\tour\back
✅ Run: npm start
   Expected: "🚀 Server running on http://localhost:5000"
✅ Leave running
```

### **TERMINAL 2: SEED DATABASE**
```bash
✅ Open new terminal in g:\tour\back
✅ Run: npm run seed
   Expected: "✅ DATABASE SEEDING COMPLETED!"
✅ Wait for completion
```

### **TERMINAL 3: FRONTEND**
```bash
✅ Open new terminal in g:\tour\front\tour_front
✅ Run: npm run dev
   Expected: "Local: http://localhost:5173"
✅ Leave running
```

### **BROWSER**
```bash
✅ Open: http://localhost:5173
✅ Click: Login button
✅ Enter: john@example.com / password123
✅ Click: Login
✅ ✅ SEE 5 TOURS! 🎉
```

---

## 📊 API ENDPOINTS OVERVIEW

### **User Routes** (Authentication)
```
POST   /users/register         ← Create new user
POST   /users/login            ← Get token
GET    /users/profile          ← Current user (with token)
```

### **Tour Routes**
```
GET    /tours                  ← List all tours
GET    /tours/:id              ← Get one tour
GET    /tours/slug/:slug       ← Get by slug
GET    /tours/search?q=paris   ← Search tours
GET    /tours/types            ← Get tour types
```

### **Booking Routes** (Protected)
```
POST   /bookings               ← Create booking (with token)
GET    /bookings               ← All bookings (admin)
GET    /bookings/user/:userId  ← My bookings (with token)
```

---

## 🔍 HOW TO VERIFY EVERYTHING WORKS

### **Check 1: Backend Connected**
```bash
# Terminal 1 should show:
🚀 Server running on http://localhost:5000
```

### **Check 2: Database Seeded**
```bash
# Terminal 2 should show:
✅ DATABASE SEEDING COMPLETED!
📊 Data Summary:
   • Users: 3
   • Tour Types: 4
   • Tours: 5
```

### **Check 3: Frontend Running**
```bash
# Terminal 3 should show:
VITE v7.1.12  ready
Local:   http://localhost:5173/
```

### **Check 4: Can Login**
```
Browser at localhost:5173
✅ Login page loads
✅ Enter john@example.com / password123
✅ Click Login
✅ No errors
✅ Redirected to home page
```

### **Check 5: Can See Tours**
```
✅ 5 tour cards displayed
✅ Tour titles, images, prices visible
✅ "Book Now" button on each tour
✅ Can click tour details
```

### **Check 6: Token in LocalStorage**
```
Browser F12 → Application → Local Storage
✅ See "token" entry
✅ Copy token value (starts with "eyJ")
```

### **Check 7: Database Updated**
```
MongoDB Compass:
✅ Connect with connection string
✅ View cluster0 database
✅ Collections visible:
   - users (3 documents)
   - tours (5 documents)
   - tourtypes (4 documents)
```

---

## 🎯 TEST SCENARIOS

### **Scenario 1: Login & View Tours**
```
✅ Go to localhost:5173
✅ Login with john@example.com / password123
✅ See 5 tours on homepage
✅ Can click tour details
✅ Success! ✅
```

### **Scenario 2: Register New User**
```
✅ Go to localhost:5173
✅ Click "Register"
✅ Fill form with new email
✅ Click "Register"
✅ See success message
✅ Now login with new credentials
✅ Success! ✅
```

### **Scenario 3: Book a Tour**
```
✅ Login
✅ Click "Book Now" on any tour
✅ Enter guest count, phone, address
✅ Click "Book Tour"
✅ See confirmation
✅ Go to "My Bookings"
✅ See booking listed
✅ Success! ✅
```

### **Scenario 4: Test API with Postman**
```
✅ Open Postman
✅ Import API endpoints from guide
✅ Test: POST /users/login
✅ Copy token from response
✅ Test: GET /tours (no token needed)
✅ Test: GET /bookings/user/:userId (with token)
✅ Success! ✅
```

---

## 📱 WHAT EACH PAGE DOES

### **Login Page** (`/login`)
```
┌─────────────────────┐
│   LOGIN PAGE        │
├─────────────────────┤
│ Email: [______]     │  ← Input
│ Password: [____]    │  ← Input
│ [Login Button]      │  ← POST /users/login
│ Sign Up Link        │  ← Goes to /register
└─────────────────────┘
```

### **Register Page** (`/register`)
```
┌─────────────────────┐
│ REGISTER PAGE       │
├─────────────────────┤
│ Name: [_______]     │  ← Input
│ Email: [_______]    │  ← Input
│ Password: [____]    │  ← Input
│ Phone: [_______]    │  ← Input
│ Address: [____]     │  ← Input
│ [Register Button]   │  ← POST /users/register
│ Login Link          │  ← Goes to /login
└─────────────────────┘
```

### **Home Page** (`/home`)
```
┌──────────────────────────────────────┐
│ NAVBAR: Home | My Bookings | Logout  │
├──────────────────────────────────────┤
│ Search Tours: [______________]       │
├──────────────────────────────────────┤
│ ┌─────────┐  ┌─────────┐  ┌─────────┐│
│ │ TOUR 1  │  │ TOUR 2  │  │ TOUR 3  ││
│ │ Paris   │  │Maldives │  │Swiss    ││
│ │$1500    │  │$2000    │  │$1800    ││
│ │[Book]   │  │[Book]   │  │[Book]   ││
│ └─────────┘  └─────────┘  └─────────┘│
│ ┌─────────┐  ┌─────────┐              │
│ │ TOUR 4  │  │ TOUR 5  │              │
│ │Thailand │  │New Zeal │              │
│ │$900     │  │$600     │              │
│ │[Book]   │  │[Book]   │              │
│ └─────────┘  └─────────┘              │
└──────────────────────────────────────┘
```

### **My Bookings Page** (`/my-bookings`)
```
┌────────────────────────────────────┐
│ MY BOOKINGS                        │
├────────────────────────────────────┤
│ ┌─────────────────────────────────┐│
│ │ Booking #1                      ││
│ │ Tour: Paris City Tour           ││
│ │ Guests: 2                       ││
│ │ Status: Pending                 ││
│ │ Date: 2025-06-01 to 2025-06-07 ││
│ │ [Cancel Booking]                ││
│ └─────────────────────────────────┘│
│ ┌─────────────────────────────────┐│
│ │ Booking #2                      ││
│ │ Tour: Maldives Beach Resort     ││
│ │ Guests: 3                       ││
│ │ Status: Completed               ││
│ │ Date: 2025-07-10 to 2025-07-17 ││
│ │ [View Details]                  ││
│ └─────────────────────────────────┘│
└────────────────────────────────────┘
```

---

## 💾 FILES YOU MODIFIED

```
✅ g:\tour\back\.env
   Added: JWT_SECRET=tour_app_secret_key_2024_@secure#mongodb

✅ g:\tour\front\tour_front\.env.local
   Added: VITE_API_URL=http://localhost:5000/api/v1

✅ g:\tour\back\package.json
   Added: "seed": "ts-node-dev --respawn --transpile-only src/seedData.ts"

✅ g:\tour\back\src\seedData.ts (NEW FILE)
   Created: Automated data seeding script
```

---

## 🎓 SUMMARY

### **What You Have**
- ✅ Working backend API
- ✅ Working frontend app
- ✅ MongoDB database with dummy data
- ✅ Authentication system
- ✅ 5 tours ready to book
- ✅ 3 test users ready to login

### **What You Can Do**
- ✅ Register new users
- ✅ Login with credentials
- ✅ View all tours
- ✅ Search tours
- ✅ Book tours
- ✅ View bookings
- ✅ Test all APIs

### **How It's Connected**
Frontend ↔ Backend ↔ Database
(React) (Express) (MongoDB)

### **Where Everything Runs**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Database: MongoDB Atlas (cloud)

---

## ✨ YOU'RE READY!

**Go ahead and:**
1. Open terminal in `g:\tour\back`
2. Run `npm start`
3. Open another terminal in `g:\tour\back`
4. Run `npm run seed`
5. Open another terminal in `g:\tour\front\tour_front`
6. Run `npm run dev`
7. Go to http://localhost:5173
8. Login with `john@example.com` / `password123`
9. **Enjoy your tour app!** 🚀

---

**Happy coding! 💻**
