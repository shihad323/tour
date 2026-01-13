# 📊 MongoDB Atlas - Manual Data Insertion & Testing Guide

## 🎯 Complete Step-by-Step Procedure

---

## PART 1: Access MongoDB Atlas Dashboard

### Step 1: Go to MongoDB Atlas
1. Open: https://cloud.mongodb.com
2. Login with your account
3. Click your **Project** (tour_db or similar)
4. You'll see your **Cluster** (Cluster0)

### Step 2: Open Database Collections
1. Click on **Cluster0**
2. Click **Collections** tab (in center area)
3. You'll see your **databases** on left:
   - `tour_db` ← This is your database
   - Inside: `tours`, `users`, `payments`, `bookings`, `tour-types`

---

## PART 2: Insert Sample Data into Users Collection

### Step 1: Click on "users" collection
```
Cluster0 → Collections → tour_db → users
```

### Step 2: Click Green "+" Button (Insert Document)
- Look for: **Green + icon** in top right
- Click it
- A **JSON editor** will appear

### Step 3: Copy-Paste User Data

**Delete the default `{ "_id": {...} }` and paste this:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2b$10$abc123xyz...", 
  "role": "User",
  "phone": "01234567890",
  "picture": "",
  "address": "123 Main Street, Paris",
  "isDeleted": false,
  "isActive": "Active",
  "isVerified": true,
  "auths": [],
  "createdAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  },
  "updatedAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  }
}
```

### Step 4: Click **Insert**
✅ User created!

### Step 5: Add More Users
Click **+** again and insert:

**User 2:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "$2b$10$abc123xyz...",
  "role": "User",
  "phone": "09876543210",
  "picture": "",
  "address": "456 Beach Road, Maldives",
  "isDeleted": false,
  "isActive": "Active",
  "isVerified": true,
  "auths": [],
  "createdAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  },
  "updatedAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  }
}
```

**User 3:**
```json
{
  "name": "Mike Johnson",
  "email": "mike@example.com",
  "password": "$2b$10$abc123xyz...",
  "role": "User",
  "phone": "05555555555",
  "picture": "",
  "address": "789 Mountain Street, Switzerland",
  "isDeleted": false,
  "isActive": "Active",
  "isVerified": true,
  "auths": [],
  "createdAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  },
  "updatedAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  }
}
```

✅ Now you have 3 users!

---

## PART 3: Insert Tour Types

### Step 1: Click on "tour-types" collection
```
Cluster0 → Collections → tour_db → tour-types
```

### Step 2: Click Green "+" Button

### Step 3: Insert Tour Types

**Type 1: Beach Resort**
```json
{
  "name": "Beach Resort",
  "description": "Relaxing beach destinations with crystal clear waters",
  "isDeleted": false,
  "createdAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  },
  "updatedAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  }
}
```

**Type 2: Mountain Trek**
```json
{
  "name": "Mountain Trek",
  "description": "Adventure mountain trails with stunning views",
  "isDeleted": false,
  "createdAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  },
  "updatedAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  }
}
```

**Type 3: City Tour**
```json
{
  "name": "City Tour",
  "description": "Explore famous cities and cultural landmarks",
  "isDeleted": false,
  "createdAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  },
  "updatedAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  }
}
```

**Type 4: Adventure Sports**
```json
{
  "name": "Adventure Sports",
  "description": "Thrilling activities like bungee jumping and skydiving",
  "isDeleted": false,
  "createdAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  },
  "updatedAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  }
}
```

✅ Now you have 4 tour types!

---

## PART 4: Insert Tours

### Step 1: Click on "tours" collection
```
Cluster0 → Collections → tour_db → tours
```

### Step 2: Click Green "+" Button for Each Tour

**Tour 1: Paris City Tour**
```json
{
  "slug": "paris-city-tour",
  "title": "Paris City Tour",
  "description": "Explore the magic of Paris with guided tours to Eiffel Tower, Louvre Museum, and Notre-Dame",
  "costFrom": 1500,
  "location": "Paris, France",
  "startDate": {
    "$date": "2024-12-10T00:00:00.000Z"
  },
  "endDate": {
    "$date": "2024-12-15T00:00:00.000Z"
  },
  "images": [
    "https://example.com/paris1.jpg",
    "https://example.com/paris2.jpg"
  ],
  "included": [
    "Hotel accommodation",
    "Daily breakfast",
    "Professional guide",
    "Museum entries"
  ],
  "excluded": [
    "Airfare",
    "Travel insurance",
    "Personal expenses"
  ],
  "amenities": [
    "Hotel",
    "Breakfast",
    "Guide",
    "AC Transport"
  ],
  "tourPlan": [
    {
      "day": 1,
      "activities": "Arrival and check-in at hotel"
    },
    {
      "day": 2,
      "activities": "Eiffel Tower and Seine River cruise"
    }
  ],
  "tourTypeId": "PASTE_CITY_TOUR_TYPE_ID_HERE",
  "isDeleted": false,
  "createdAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  },
  "updatedAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  }
}
```

**Tour 2: Maldives Beach Resort**
```json
{
  "slug": "maldives-beach-resort",
  "title": "Maldives Beach Resort",
  "description": "Paradise beach experience with overwater bungalows and water sports",
  "costFrom": 2000,
  "location": "Maldives",
  "startDate": {
    "$date": "2024-12-20T00:00:00.000Z"
  },
  "endDate": {
    "$date": "2024-12-27T00:00:00.000Z"
  },
  "images": [
    "https://example.com/maldives1.jpg",
    "https://example.com/maldives2.jpg"
  ],
  "included": [
    "Overwater bungalow",
    "All meals",
    "Water sports",
    "Spa access"
  ],
  "excluded": [
    "Airfare",
    "Activities outside package"
  ],
  "amenities": [
    "Resort",
    "All meals",
    "Water sports",
    "Spa"
  ],
  "tourPlan": [
    {
      "day": 1,
      "activities": "Arrival and island tour"
    },
    {
      "day": 2,
      "activities": "Snorkeling and diving"
    }
  ],
  "tourTypeId": "PASTE_BEACH_RESORT_TYPE_ID_HERE",
  "isDeleted": false,
  "createdAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  },
  "updatedAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  }
}
```

**Tour 3: Swiss Mountain Trek**
```json
{
  "slug": "swiss-mountain-trek",
  "title": "Swiss Mountain Trek",
  "description": "Alpine hiking with breathtaking mountain scenery and cable car rides",
  "costFrom": 1800,
  "location": "Swiss Alps, Switzerland",
  "startDate": {
    "$date": "2025-01-05T00:00:00.000Z"
  },
  "endDate": {
    "$date": "2025-01-12T00:00:00.000Z"
  },
  "images": [
    "https://example.com/swiss1.jpg"
  ],
  "included": [
    "Mountain lodge",
    "Meals",
    "Professional guide",
    "Equipment"
  ],
  "excluded": [
    "Airfare"
  ],
  "amenities": [
    "Lodge",
    "Meals",
    "Guide",
    "Equipment"
  ],
  "tourPlan": [
    {
      "day": 1,
      "activities": "Arrival at mountain base"
    }
  ],
  "tourTypeId": "PASTE_MOUNTAIN_TREK_TYPE_ID_HERE",
  "isDeleted": false,
  "createdAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  },
  "updatedAt": {
    "$date": "2024-12-04T10:00:00.000Z"
  }
}
```

✅ Tours inserted!

---

## PART 5: How to Get Tour Type IDs

### To add tourTypeId to tours:

1. Go to **tour-types** collection
2. Click on each type (Beach Resort, Mountain Trek, City Tour, Adventure)
3. Copy the **`_id`** value (looks like: `6755a1b2c3d4e5f6g7h8i9j0`)
4. Paste it as **`tourTypeId`** in each tour

Example:
```json
"tourTypeId": "6755a1b2c3d4e5f6g7h8i9j0"
```

---

## PART 6: Test Data Fetching

### Step 1: Start Your Backend
```bash
cd g:\tour\back
npm start
```
Wait for: `✅ MongoDB connected successfully`

### Step 2: Test in Postman or Browser

**Test 1: Get All Users**
```bash
curl http://localhost:5000/api/v1/users
```

**Test 2: Get All Tours**
```bash
curl http://localhost:5000/api/v1/tours
```

**Test 3: Get All Tour Types**
```bash
curl http://localhost:5000/api/v1/tours/tour-types
```

✅ Should return your inserted data!

---

## PART 7: Alternative - Use MongoDB Compass (Easier Way)

### What is MongoDB Compass?
Visual tool to see and manage your database (like Microsoft Access for databases)

### Download & Install:
1. Go: https://www.mongodb.com/products/tools/compass
2. Download for **Windows**
3. Install it

### Connect to Your Database:
1. Open MongoDB Compass
2. Click **"New Connection"**
3. Paste your connection string:
```
mongodb+srv://iftakhar01755_db_user:aiwMvYdV6arT1FMN@cluster0.vodmaws.mongodb.net/?retryWrites=true&w=majority
```
4. Click **Connect**
5. You'll see all your collections on left

### Insert Data in Compass:
1. Click **tour_db** → **users**
2. Click **"+ Insert Document"**
3. Copy-paste JSON data
4. Click **Insert**
5. Done! Much easier than Atlas UI

---

## PART 8: Using the Seed Script (EASIEST Way)

Instead of manual entry, use the automated script:

### Step 1: Run Seed Script
```bash
cd g:\tour\back
npm run seed
```

**Expected Output:**
```
✅ Database connected successfully!
✅ Seeding Users...
✅ Seeding Tour Types...
✅ Seeding Tours...
✅ DATABASE SEEDING COMPLETED!
```

### This automatically inserts:
✅ 3 test users (john, jane, mike)
✅ 4 tour types
✅ 5 sample tours
✅ All relationships connected

---

## 📋 Quick Comparison

| Method | Time | Difficulty | Result |
|--------|------|-----------|--------|
| **Manual Atlas UI** | 20 min | Hard ❌ | Works but tedious |
| **MongoDB Compass** | 10 min | Medium ⚠️ | Better experience |
| **Seed Script** | 1 min | Easy ✅ | **RECOMMENDED** ✅ |

---

## 🚀 RECOMMENDED QUICK SETUP (30 seconds)

### Step 1: Start Backend
```bash
cd g:\tour\back
npm start
```
Wait for: `🚀 Server running on http://localhost:5000`

### Step 2: Run Seed (new terminal)
```bash
cd g:\tour\back
npm run seed
```
Wait for: `✅ DATABASE SEEDING COMPLETED!`

### Step 3: Verify Data in MongoDB Atlas
1. Go to: https://cloud.mongodb.com
2. Click **Collections** tab
3. See your data populated! ✅

### Step 4: Test in Postman
```
GET http://localhost:5000/api/v1/tours
```
Should return 5 tours! 🎉

---

## ✅ Verification Checklist

After seeding, verify in MongoDB Atlas:

- [ ] **Users Collection**: 3 users (john, jane, mike)
- [ ] **Tour Types Collection**: 4 types (Beach, Mountain, City, Adventure)
- [ ] **Tours Collection**: 5 tours (all with descriptions)
- [ ] **Each tour has**: title, location, costFrom, startDate, images
- [ ] **Can login** with: john@example.com / password123

---

## 🔍 If Data NOT Showing

### Check 1: Is Backend Running?
```bash
curl http://localhost:5000
```
Should return: `Welcome to Tour Management API`

If NOT, run: `npm start`

### Check 2: Is Database Connected?
Look at terminal output - should show:
```
✅ MongoDB connected successfully
```

If NOT, check `.env` file for correct `MONGODB_URI`

### Check 3: Is Data Actually in MongoDB?
1. Go to MongoDB Atlas
2. Click **Collections** tab
3. Click **users**, **tours**, **tour-types**
4. Should see documents

If empty, run: `npm run seed`

### Check 4: Test API Directly
```bash
# Test in browser console:
fetch('http://localhost:5000/api/v1/tours')
  .then(r => r.json())
  .then(d => console.log(d))
```

---

## 📚 Summary

### ✅ Data Flow:
```
Insert Data (Atlas/Compass/Seed)
    ↓
MongoDB Atlas (Cloud Database)
    ↓
Backend connects (npm start)
    ↓
Frontend fetches (npm run dev)
    ↓
Display on http://localhost:5173
```

### ✅ 3 Ways to Insert Data:
1. **Manual Atlas UI** - Slow but works
2. **MongoDB Compass** - Visual and easy
3. **Seed Script** - Fastest (1 command) ⭐ **RECOMMENDED**

### ✅ To See Data:
- **In Database**: MongoDB Atlas Dashboard
- **In Backend**: Postman or `curl` command
- **In Frontend**: http://localhost:5173 after login

---

**Choose Option: RUN THE SEED SCRIPT** 🚀
```bash
cd g:\tour\back && npm run seed
```

It's the fastest and most reliable way! ✨
