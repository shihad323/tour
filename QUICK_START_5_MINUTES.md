# ⚡ QUICK START GUIDE - 5 MINUTES TO SUCCESS

## 🎯 YOUR GOAL
✅ Insert dummy data into MongoDB
✅ Register a new user
✅ Login to the app
✅ See tours on homepage
✅ See data at localhost:5173

---

## ⏱️ STEP-BY-STEP (5 Minutes)

### **STEP 1: Open Terminal 1 - Start Backend** (1 min)

```bash
cd g:\tour\back
npm start
```

**Expected Output:**
```
🚀 Server running on http://localhost:5000
```

✅ Leave this terminal running

---

### **STEP 2: Open Terminal 2 - Seed Database** (1 min)

While backend is running, open a NEW terminal:

```bash
cd g:\tour\back
npm run seed
```

**Expected Output:**
```
✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!

📊 Data Summary:
   • Users: 3
   • Tour Types: 4
   • Tours: 5

🔐 Test Credentials:
   User 1:
   Email: john@example.com
   Password: password123
   ...
```

✅ This seeds 5 collections with dummy data

---

### **STEP 3: Open Terminal 3 - Start Frontend** (1 min)

Open ANOTHER new terminal:

```bash
cd g:\tour\front\tour_front
npm run dev
```

**Expected Output:**
```
VITE v7.1.12  ready in 1234 ms

➜  Local:   http://localhost:5173/
```

✅ Leave this terminal running

---

### **STEP 4: Open Browser** (1 min)

1. Go to: **http://localhost:5173**
2. You should see the tour app

---

### **STEP 5: Test Login** (1 min)

1. Click **"Login"** button
2. Enter credentials:
   - **Email:** `john@example.com`
   - **Password:** `password123`
3. Click **"Login"**

**Expected Result:**
```
✅ Login successful
✅ Redirected to homepage
✅ Tours displayed
✅ Token saved to localStorage
```

---

## 🔍 VERIFY EVERYTHING WORKS

### ✅ Check 1: Tours are displayed

After login, you should see:
- 5 tour cards
- Tour titles, locations, prices
- "Book Now" buttons

### ✅ Check 2: Token in localStorage

Open browser DevTools (F12):
1. Go to **Application** tab
2. Click **Local Storage**
3. You should see a `token` entry

### ✅ Check 3: Database data

Visit MongoDB Compass or Atlas:
1. View `users` collection - should have 3 users
2. View `tours` collection - should have 5 tours
3. View `tourtypes` collection - should have 4 tour types

---

## 📝 TEST USER CREDENTIALS

| User | Email | Password |
|------|-------|----------|
| **User 1** | john@example.com | password123 |
| **User 2** | jane@example.com | password456 |
| **Admin** | admin@example.com | password123 |

---

## 🆕 CREATE YOUR OWN USER

1. Click "Register" button
2. Fill in the form:
   - Name: Your Name
   - Email: youremail@example.com
   - Password: yourpassword123
   - Phone: 01912345678
   - Address: Your Address

3. Click "Register"
4. Then login with your new credentials

---

## ❌ IF SOMETHING FAILS

### **Error: "Cannot POST /users/login"**
- Backend not running
- Fix: Run `npm start` in backend terminal

### **Error: "Cannot connect to MongoDB"**
- Database connection failed
- Fix: Check MONGO_URI in `.env`

### **Error: "Tours not loading"**
- Database not seeded
- Fix: Run `npm run seed` in backend terminal

### **Error: "Login Failed"**
- Wrong email/password
- Fix: Check email spelling and use correct password

### **Error: "Port 5173 already in use"**
- Another app using same port
- Fix: `npm run dev -- --port 5174`

---

## 📊 WHAT HAPPENS WHEN YOU LOGIN

```
Browser → Login Form
   ↓
Frontend sends to Backend: POST /api/v1/users/login
   ↓
Backend queries MongoDB for user
   ↓
Backend compares password (bcryptjs)
   ↓
Backend generates JWT token
   ↓
Response: token + user data
   ↓
Frontend stores token in localStorage
   ↓
Axios interceptor adds token to future requests
   ↓
GET /api/v1/tours (with token in header)
   ↓
Tours load and display ✅
```

---

## 🎉 YOU'RE DONE!

You now have:
✅ Backend running on port 5000
✅ Frontend running on port 5173
✅ MongoDB database with 5 tours
✅ Working register/login
✅ Tours displaying on homepage

**Next Steps:**
- Book a tour
- Check your bookings
- Try register with new email
- Logout and login again

---

## 📞 NEED HELP?

Check these files in `g:\tour\`:
1. `DATABASE_AND_DATAFLOW.md` - Database structure
2. `ER_DIAGRAM_AND_API_FLOW.md` - API flows
3. `SETUP_GUIDE_DUMMY_DATA_AND_LOGIN.md` - Detailed guide

**Enjoy your tour app! 🚀**
