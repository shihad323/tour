# 🚀 COMPLETE SETUP GUIDE: DATABASE, REGISTER, LOGIN & DUMMY DATA

## ⚠️ PROBLEM DIAGNOSIS

Your login/register is failing because:
1. **Missing JWT_SECRET** in `.env` file
2. **Backend not running** or connection issues
3. **Dummy data not in database** yet
4. **Port mismatch** between frontend and backend

---

## ✅ STEP 1: FIX YOUR BACKEND `.env` FILE

**Current Status:** Missing critical variables

**Fix:** Update your `.env` file at `g:\tour\back\.env`

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://iftakhar01755_db_user:aiwMvYdV6arT1FMN@cluster0.vodmaws.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_2024_@secure#key
```

⚠️ **IMPORTANT:** Add the `JWT_SECRET` line - this is required for token generation!

---

## ✅ STEP 2: ENSURE VITE_API_URL IN FRONTEND

**Create or update:** `g:\tour\front\tour_front\.env.local`

```env
VITE_API_URL=http://localhost:5000/api/v1
```

This ensures frontend connects to your backend properly.

---

## ✅ STEP 3: START BACKEND SERVER

Open terminal and navigate to backend:

```bash
cd g:\tour\back

# Install dependencies (if not done)
npm install

# Start the server
npm start
```

**You should see:**
```
🚀 Server running on http://localhost:5000
```

---

## ✅ STEP 4: INSERT DUMMY DATA INTO MONGODB

### **Option A: Using MongoDB Compass (GUI - RECOMMENDED)**

**1. Download and Install MongoDB Compass**
- Download from: https://www.mongodb.com/products/compass
- Install it

**2. Connect to Your Database**
- Open MongoDB Compass
- Click "Connect with Connection String"
- Paste your connection string:
  ```
  mongodb+srv://iftakhar01755_db_user:aiwMvYdV6arT1FMN@cluster0.vodmaws.mongodb.net/?retryWrites=true&w=majority
  ```
- Click "Connect"

**3. Create Collections**
- Right-click on `cluster0` database
- Select "Create Collection"
- Create these collections:
  - `users`
  - `tours`
  - `tourtypes`
  - `bookings`
  - `payments`

**4. Insert Dummy Users** (Click "+ INSERT DOCUMENT")

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$5.HnL1FRXiJXc7FXj2KU2eI8XcW1dZiD3HXXEwA.tYYW5VKBVXe6e",
  "role": "User",
  "phone": "01912345678",
  "address": "123 Main Street, Dhaka",
  "isActive": "Active",
  "isVerified": true,
  "isDeleted": false,
  "createdAt": {"$date": "2024-12-04T00:00:00.000Z"},
  "updatedAt": {"$date": "2024-12-04T00:00:00.000Z"}
}
```

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "$2a$10$5.HnL1FRXiJXc7FXj2KU2eI8XcW1dZiD3HXXEwA.tYYW5VKBVXe6e",
  "role": "User",
  "phone": "01987654321",
  "address": "456 Park Lane, Dhaka",
  "isActive": "Active",
  "isVerified": true,
  "isDeleted": false,
  "createdAt": {"$date": "2024-12-04T00:00:00.000Z"},
  "updatedAt": {"$date": "2024-12-04T00:00:00.000Z"}
}
```

**5. Insert Dummy Tour Types**

```json
{
  "name": "Beach Resort",
  "description": "Relaxing beach vacation tours",
  "isDeleted": false,
  "createdAt": {"$date": "2024-12-04T00:00:00.000Z"},
  "updatedAt": {"$date": "2024-12-04T00:00:00.000Z"}
}
```

```json
{
  "name": "Mountain Trek",
  "description": "Adventure mountain climbing tours",
  "isDeleted": false,
  "createdAt": {"$date": "2024-12-04T00:00:00.000Z"},
  "updatedAt": {"$date": "2024-12-04T00:00:00.000Z"}
}
```

**6. Insert Dummy Tours** (After getting TourType IDs)

First, copy the `_id` of "Beach Resort" tour type you just created.

```json
{
  "slug": "paris-city-tour-2024",
  "title": "Paris City Tour",
  "description": "Explore the beautiful city of Paris with our guided tour. Visit the Eiffel Tower, Louvre Museum, and more!",
  "images": ["paris1.jpg", "paris2.jpg", "paris3.jpg"],
  "location": "Paris, France",
  "costFrom": 1500,
  "startDate": {"$date": "2024-12-20T00:00:00.000Z"},
  "endDate": {"$date": "2024-12-27T00:00:00.000Z"},
  "tourType": {"$oid": "PASTE_TOURTYPE_ID_HERE"},
  "included": ["Hotel", "Transport", "Breakfast", "Guided Tour"],
  "excluded": ["Dinner", "Personal Expenses"],
  "amenities": ["WiFi", "AC", "Swimming Pool"],
  "tourPlan": ["Day 1: Arrival and City Tour", "Day 2: Eiffel Tower", "Day 3: Louvre Museum"],
  "isDeleted": false,
  "createdAt": {"$date": "2024-12-04T00:00:00.000Z"},
  "updatedAt": {"$date": "2024-12-04T00:00:00.000Z"}
}
```

```json
{
  "slug": "bangkok-adventure-2024",
  "title": "Bangkok Adventure",
  "description": "Experience the vibrant culture of Bangkok. Visit temples, markets, and night bazaar!",
  "images": ["bangkok1.jpg", "bangkok2.jpg"],
  "location": "Bangkok, Thailand",
  "costFrom": 800,
  "startDate": {"$date": "2025-01-10T00:00:00.000Z"},
  "endDate": {"$date": "2025-01-15T00:00:00.000Z"},
  "tourType": {"$oid": "PASTE_TOURTYPE_ID_HERE"},
  "included": ["Hotel", "Transport", "Lunch"],
  "excluded": ["Dinner"],
  "amenities": ["WiFi", "Fan"],
  "tourPlan": ["Day 1: Grand Palace", "Day 2: Temple Tour", "Day 3: Night Bazaar"],
  "isDeleted": false,
  "createdAt": {"$date": "2024-12-04T00:00:00.000Z"},
  "updatedAt": {"$date": "2024-12-04T00:00:00.000Z"}
}
```

---

### **Option B: Using MongoDB Shell (Command Line)**

Open terminal or MongoDB Shell:

```bash
# Connect to database
mongosh "mongodb+srv://iftakhar01755_db_user:aiwMvYdV6arT1FMN@cluster0.vodmaws.mongodb.net/?retryWrites=true&w=majority"

# Select database
use cluster0

# Insert test user
db.users.insertOne({
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$5.HnL1FRXiJXc7FXj2KU2eI8XcW1dZiD3HXXEwA.tYYW5VKBVXe6e",
  "role": "User",
  "phone": "01912345678",
  "address": "123 Main Street, Dhaka",
  "isActive": "Active",
  "isVerified": true,
  "isDeleted": false,
  "createdAt": new Date(),
  "updatedAt": new Date()
})

# Verify insertion
db.users.find()
```

---

### **Option C: Using Node.js Script (AUTOMATED)**

Create a file: `g:\tour\back\src\seedData.ts`

```typescript
import mongoose from 'mongoose';
import User from './app/user/user.model';
import bcrypt from 'bcryptjs';

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      'mongodb+srv://iftakhar01755_db_user:aiwMvYdV6arT1FMN@cluster0.vodmaws.mongodb.net/?retryWrites=true&w=majority'
    );
    console.log('✅ Connected to MongoDB');

    // Hash passwords
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('password456', 10);

    // Clear existing users (optional)
    await User.deleteMany({});

    // Insert dummy users
    const users = await User.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword1,
        role: 'User',
        phone: '01912345678',
        address: '123 Main Street, Dhaka',
        isActive: 'Active',
        isVerified: true,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword2,
        role: 'User',
        phone: '01987654321',
        address: '456 Park Lane, Dhaka',
        isActive: 'Active',
        isVerified: true,
      },
    ]);

    console.log('✅ Users inserted:', users.length);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedData();
```

Then run:
```bash
npm run seed
```

---

## ✅ STEP 5: START FRONTEND

Open new terminal and navigate to frontend:

```bash
cd g:\tour\front\tour_front

# Install dependencies (if not done)
npm install

# Start frontend
npm run dev
```

**You should see:**
```
VITE v7.1.12  ready in 1234 ms

➜  Local:   http://localhost:5173/
```

---

## ✅ STEP 6: REGISTER NEW USER

1. Open browser: `http://localhost:5173`
2. Click "Register" button
3. Fill in form:
   - **Name:** Your Name
   - **Email:** newemail@example.com
   - **Password:** password123
   - **Phone:** 01912345678
   - **Address:** Your Address

4. Click "Register"

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "ObjectId",
    "name": "Your Name",
    "email": "newemail@example.com"
  }
}
```

---

## ✅ STEP 7: LOGIN WITH EXISTING USER

1. Click "Login" button
2. Use existing dummy user credentials:
   - **Email:** john@example.com
   - **Password:** password123

3. Click "Login"

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "ObjectId",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "User"
    },
    "token": "eyJhbGc..."
  }
}
```

**Token will be saved to localStorage automatically!**

---

## ✅ STEP 8: VIEW TOURS ON HOMEPAGE

1. After successful login, you'll be redirected to Home
2. Tours will automatically fetch and display
3. You should see the dummy tours you inserted

---

## 🔧 TROUBLESHOOTING

### **"Cannot POST /users/register" Error**

**Issue:** Backend not running or incorrect API URL

**Solution:**
```bash
# Make sure backend is running on port 5000
npm start

# Check if API URL is correct in frontend
# Should be: http://localhost:5000/api/v1
```

---

### **"JWT_SECRET is undefined" Error**

**Issue:** Missing JWT_SECRET in `.env`

**Solution:** Add to `g:\tour\back\.env`:
```env
JWT_SECRET=your_jwt_secret_key_2024_@secure#key
```

---

### **"Cannot read property 'map' of undefined" Error**

**Issue:** Tours data not loading from database

**Solution:**
1. Verify tours are inserted in MongoDB
2. Check database connection string is correct
3. Restart backend server

---

### **"Cannot connect to MongoDB" Error**

**Issue:** Wrong connection string or network issue

**Solution:**
1. Verify connection string in `.env`
2. Check MongoDB Atlas account
3. Add your IP to MongoDB Atlas whitelist:
   - Go to Security → Network Access
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere"

---

### **"Login Failed" on Frontend**

**Issue:** Wrong email/password or JWT token issue

**Solution:**
1. Verify user exists in database
2. Check password is correct (case-sensitive)
3. Make sure JWT_SECRET is set in backend
4. Clear browser localStorage and retry

---

## 📋 COMPLETE CHECKLIST

- [ ] Add `JWT_SECRET` to `.env`
- [ ] Add `VITE_API_URL` to frontend `.env.local`
- [ ] Start backend on port 5000
- [ ] Start frontend on port 5173
- [ ] Insert dummy data to MongoDB
- [ ] Test register endpoint
- [ ] Test login endpoint
- [ ] Verify tours display on homepage
- [ ] Check localStorage for token

---

## 🎯 QUICK REFERENCE: CREDENTIALS

**Test User 1 (Dummy Data):**
- Email: `john@example.com`
- Password: `password123`

**Test User 2 (Dummy Data):**
- Email: `jane@example.com`
- Password: `password456`

**Your Custom User (After Register):**
- Create any new user with email & password you want

---

## 📱 COMPLETE DATA FLOW

```
1. USER REGISTERS
   ↓
   Frontend Form → Axios POST → Backend /users/register
   ↓
   Backend: Hash password → Save to MongoDB users collection
   ↓
   Response: Success ✅

2. USER LOGS IN
   ↓
   Frontend Form → Axios POST → Backend /users/login
   ↓
   Backend: Find user → Compare password → Generate JWT token
   ↓
   Response: Token + User data → Save token to localStorage ✅

3. USER VIEWS TOURS
   ↓
   Frontend: Axios GET → Backend /tours
   ↓
   Backend: Query MongoDB tours collection → Populate tourType
   ↓
   Response: Tours array → Display in React component ✅

4. USER BOOKS TOUR
   ↓
   Frontend Form → Axios POST → Backend /bookings
   ↓
   (JWT token automatically added by interceptor)
   ↓
   Backend: Create booking + payment → Save to MongoDB
   ↓
   Response: Success + Booking ID ✅
```

---

**You're all set! Now you have:**
✅ Fixed backend with JWT_SECRET
✅ Frontend connected to backend
✅ Dummy data in MongoDB
✅ Working register/login
✅ Tours displaying on homepage

**Test it now! 🚀**
