# Fix Network Error - Complete Restart Guide

## Status
All servers were stopped (Exit Code 130 on all terminals). This is why you're seeing network error - the backend isn't running on port 5000.

## ✅ Step-by-Step Fix (Do in This Order)

### **Step 1: Start Backend Server** (Terminal 1)
```bash
cd g:\tour\back
npm start
```

**Expected Output:**
```
✅ 🔌 Database connected successfully!
🚀 Server running on http://localhost:5000
```

**Wait for this message before proceeding!** ⏳

---

### **Step 2: Seed Database** (Terminal 2 - Keep Terminal 1 running)
Open a NEW terminal and run:
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

**Wait for completion before proceeding!** ⏳

---

### **Step 3: Start Frontend** (Terminal 3 - Keep Terminals 1 & 2 running)
Open a NEW terminal and run:
```bash
cd g:\tour\front\tour_front
npm run dev
```

**Expected Output:**
```
  Local:   http://localhost:5173/
```

**Now visit: http://localhost:5173** ✨

---

## 🔑 Test Credentials (After seeding completes)

Use these to login:

**User 1:**
- Email: `john@example.com`
- Password: `password123`

**User 2:**
- Email: `sarah@example.com`
- Password: `password123`

**User 3:**
- Email: `mike@example.com`
- Password: `password123`

---

## 🐛 Verify Connection is Working

Before logging in, test if backend is accessible:

**Open Browser Console** (Press F12) and try:
```javascript
fetch('http://localhost:5000/api/v1/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'john@example.com', password: 'password123' })
})
.then(r => r.json())
.then(d => console.log(d))
```

**Should see:**
- ✅ Token in response (if correct credentials)
- ❌ "Invalid email or password" (if wrong credentials)

If you see **network error**, the backend is **NOT running on port 5000**.

---

## 🔍 Network Error Diagnosis

If you're still seeing "network error", check:

### **1. Is Backend Running?**
In Terminal 1, you should see:
```
🚀 Server running on http://localhost:5000
```

If NOT, go back to **Step 1**

### **2. Is Backend Accessible?**
Open terminal and run:
```bash
curl http://localhost:5000
```

**Should return:**
```
Welcome to Tour Management API
```

If it says "Connection refused", backend isn't running.

### **3. Check .env Configuration**
File: `g:\tour\back\.env`
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.vodmaws.mongodb.net/tour_db?retryWrites=true&w=majority
JWT_SECRET=tour_app_secret_key_2024_@secure#mongodb
```

All these MUST exist.

### **4. Check Frontend .env.local**
File: `g:\tour\front\tour_front\.env.local`
```
VITE_API_URL=http://localhost:5000/api/v1
```

This MUST be exactly this URL.

### **5. Check Browser Console (F12)**
Go to:
- **Console tab** → See actual error message
- **Network tab** → See request to `localhost:5000`
  - ✅ Should see green 200 (success)
  - ❌ Failed if not connected

---

## ⚠️ Common Issues

| Problem | Solution |
|---------|----------|
| "Network error" when logging in | Backend not running (Step 1) |
| "Invalid email or password" | Correct! Database seeded but credentials wrong |
| Nothing appears after login | Frontend not running (Step 3) |
| Database connection error | Check MONGO_URI in .env |
| CORS error | Backend CORS already enabled ✅ |

---

## 📝 Summary

```
Terminal 1 (Must be running):  npm start        (Backend on :5000)
Terminal 2 (Run once):         npm run seed     (Populate database)
Terminal 3 (Must be running):  npm run dev      (Frontend on :5173)
```

**Never stop Terminal 1 or 3 while testing!**

---

## ✨ You're All Set!

Once all 3 terminals show success:
1. Open http://localhost:5173
2. Click "Login"
3. Enter: `john@example.com` / `password123`
4. Should see 5 sample tours on homepage 🎉
