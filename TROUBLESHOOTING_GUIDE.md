# 🔧 TROUBLESHOOTING GUIDE - Fix Common Issues

## ❌ COMMON ISSUES & SOLUTIONS

---

## Issue 1: "Cannot POST /users/register" - 404 Error

### ❌ Problem
```
POST http://localhost:5000/api/v1/users/register
Error: 404 Cannot POST /users/register
```

### ✅ Solutions

**A. Backend Not Running**
```bash
# Check if backend is running on port 5000
# Open new terminal and run:
cd g:\tour\back
npm start

# Expected output:
🚀 Server running on http://localhost:5000
```

**B. Wrong API URL in Frontend**
- Check `.env.local` in `g:\tour\front\tour_front\`
- Should contain:
  ```env
  VITE_API_URL=http://localhost:5000/api/v1
  ```
- If missing, restart frontend: `npm run dev`

**C. Axios Client Not Configured**
- Check `g:\tour\front\tour_front\src\api\client.ts`
- Should have `baseURL: API_BASE_URL`

---

## Issue 2: "Login Failed" - 401 Unauthorized

### ❌ Problem
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### ✅ Solutions

**A. Wrong Email or Password**
- Password is case-sensitive
- Use exactly: `john@example.com` / `password123`
- Check MongoDB for user exists: `db.users.findOne({email: "john@example.com"})`

**B. User Not in Database**
- Seed the database first:
  ```bash
  cd g:\tour\back
  npm run seed
  ```

**C. JWT_SECRET Missing**
- Backend can't generate tokens
- Add to `g:\tour\back\.env`:
  ```env
  JWT_SECRET=tour_app_secret_key_2024_@secure#mongodb
  ```
- Restart backend

**D. Password Hash Mismatch**
- Make sure password in DB is hashed (starts with `$2a$`)
- If pasting plaintext, the login will fail
- Solution: Re-seed with `npm run seed`

---

## Issue 3: "Tours Not Loading" - Empty Array

### ❌ Problem
```
Homepage shows no tours
db.tours.find() shows empty array
```

### ✅ Solutions

**A. Database Not Seeded**
```bash
cd g:\tour\back
npm run seed
```

**B. Wrong Database Name**
- Check `MONGO_URI` in `.env`
- Connect to MongoDB Atlas directly to verify data:
  ```bash
  mongosh "mongodb+srv://iftakhar01755_db_user:aiwMvYdV6arT1FMN@cluster0.vodmaws.mongodb.net/?retryWrites=true&w=majority"
  use cluster0
  db.tours.find()
  ```

**C. Tours Collection Has Wrong Data Structure**
- Check tour document has all required fields
- Missing fields: `slug`, `title`, `location`, `costFrom`, `tourType`

**D. TourType References Broken**
- Tours must reference valid TourType documents
- Check `tourType` field points to existing TourType ID

---

## Issue 4: "Cannot Connect to MongoDB" - ECONNREFUSED

### ❌ Problem
```
MongoError: connect ECONNREFUSED 127.0.0.1:27017
or
Error: connect() failed
```

### ✅ Solutions

**A. Connection String Wrong**
- Check `.env` has correct connection string:
  ```env
  MONGO_URI=mongodb+srv://iftakhar01755_db_user:aiwMvYdV6arT1FMN@cluster0.vodmaws.mongodb.net/?retryWrites=true&w=majority
  ```
- Copy exactly from MongoDB Atlas

**B. IP Not Whitelisted in MongoDB Atlas**
1. Go to https://cloud.mongodb.com
2. Select your cluster
3. Go to **Security → Network Access**
4. Click **"Add IP Address"**
5. Select **"Allow access from anywhere"** (or add your IP)
6. Click **"Confirm"**

**C. MongoDB Atlas Account Down**
- Check status: https://status.mongodb.com/
- Wait a few minutes and retry

**D. Credentials Wrong**
- Username: `iftakhar01755_db_user`
- Password: `aiwMvYdV6arT1FMN`
- If changed, update in `.env`

---

## Issue 5: "JWT Token Expires" - 401 After Login

### ❌ Problem
```
Login works first time
After 5 minutes: 401 Unauthorized on GET /bookings
```

### ✅ Solutions

**A. Token Expired**
- Tokens are valid for 7 days by default
- If testing, this shouldn't happen in 5 min
- Solution: Login again

**B. Token Not Sent in Request**
- Check Axios interceptor in `client.ts`
- Should add header: `Authorization: Bearer {token}`
- Check token exists in localStorage: 
  ```javascript
  localStorage.getItem('token')
  ```

**C. JWT_SECRET Changed**
- If you change `JWT_SECRET` in `.env`
- Old tokens become invalid
- Solution: Login again

---

## Issue 6: "Port Already in Use"

### ❌ Problem
```
Error: listen EADDRINUSE :::5000
or
Error: listen EADDRINUSE :::5173
```

### ✅ Solutions

**A. Port 5000 Already Used (Backend)**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID)
taskkill /PID 12345 /F

# OR start backend on different port
PORT=5001 npm start
```

**B. Port 5173 Already Used (Frontend)**
```bash
# Start frontend on different port
npm run dev -- --port 5174

# Then update frontend .env.local if needed
```

**C. Previous Instance Still Running**
```bash
# Close all previous terminals
# Open fresh terminal
# Start backend and frontend separately
```

---

## Issue 7: "Cannot find module 'express'" - npm packages not installed

### ❌ Problem
```
Error: Cannot find module 'express'
```

### ✅ Solutions

**A. Dependencies Not Installed**
```bash
cd g:\tour\back
npm install

# Wait for installation to complete
```

**B. node_modules Corrupted**
```bash
cd g:\tour\back
rm -rf node_modules package-lock.json
npm install
```

**C. Old npm Cache**
```bash
npm cache clean --force
npm install
```

---

## Issue 8: "Booking Failed" - 500 Internal Server Error

### ❌ Problem
```json
{
  "success": false,
  "message": "Error"
}
```

### ✅ Solutions

**A. User ID Not Valid**
- JWT token must contain valid user ID
- Check token in localStorage

**B. Tour ID Doesn't Exist**
- Tour ID in request must be valid MongoDB ObjectId
- Verify tour exists: `db.tours.findOne({_id: ObjectId("ID")})`

**C. Missing Required Fields**
- Booking requires: `tour`, `guestCount`, `phone`, `address`
- Check all fields sent in request

**D. Backend Error Log**
- Check backend terminal for detailed error
- Look at console.error output

---

## Issue 9: "Email Already Registered" - Cannot Register Same Email

### ❌ Problem
```json
{
  "success": false,
  "message": "User already exists"
}
```

### ✅ Solutions

**A. Email Already in Database**
- User model has `unique: true` on email field
- Solution: Use different email address

**B. Previous Test Created User**
- Check MongoDB for user exists
- Delete if needed: `db.users.deleteOne({email: "test@example.com"})`

**C. Case Sensitivity Issue**
- Email is converted to lowercase
- `Test@example.com` and `test@example.com` are same
- Solution: Use different email

---

## Issue 10: "CORS Error" - Frontend Cannot Call Backend

### ❌ Problem
```
Access to XMLHttpRequest at 'http://localhost:5000/api/v1/users/login' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

### ✅ Solutions

**A. CORS Not Configured in Backend**
- Check `g:\tour\back\src\app.ts`
- Should have CORS setup
- Add if missing:
  ```typescript
  import cors from 'cors';
  app.use(cors());
  ```

**B. Wrong Frontend URL in CORS**
- If using CORS whitelist, add `http://localhost:5173`
- Example:
  ```typescript
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
  ```

---

## Issue 11: "Vite says port 5173 in use but I don't see it"

### ❌ Problem
```
VITE v7.1.12  error when starting dev server:
Error: Port 5173 is in use by another process
```

### ✅ Solutions

**A. Kill Process on Port 5173**
```bash
# Windows: Find and kill
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use different port
npm run dev -- --port 5174
```

**B. Restart Development Server**
```bash
# Press Ctrl+C to stop Vite
# Close terminal
# Open new terminal
# Run: npm run dev
```

---

## Issue 12: "Changes Not Reflecting" - Cache Issues

### ❌ Problem
```
I changed code but don't see changes
Frontend shows old UI
```

### ✅ Solutions

**A. Hard Refresh Browser**
```
Windows: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

**B. Clear Browser Cache**
```
DevTools (F12) → Application → Clear Storage → Clear Site Data
```

**C. Clear localStorage**
```javascript
// Run in browser console:
localStorage.clear()
location.reload()
```

**D. Restart Development Server**
```bash
# Stop Vite (Ctrl+C)
npm run dev
```

---

## 🎯 QUICK DIAGNOSIS CHECKLIST

**If login is failing:**
- [ ] Backend running? `npm start` in `g:\tour\back`
- [ ] JWT_SECRET in `.env`?
- [ ] Database seeded? `npm run seed`
- [ ] User exists in DB? Check MongoDB
- [ ] Email/password correct?

**If tours not loading:**
- [ ] Backend running?
- [ ] Database seeded?
- [ ] Tours exist in MongoDB?
- [ ] Frontend API URL correct?

**If can't register:**
- [ ] Backend running?
- [ ] Email not already used?
- [ ] All fields filled (name, email, password)?

**If port issues:**
- [ ] Port 5000 free for backend?
- [ ] Port 5173 free for frontend?
- [ ] Previous terminal closed?

---

## 📞 STILL HAVING ISSUES?

**Check these files:**
1. `g:\tour\QUICK_START_5_MINUTES.md` - Quick setup
2. `g:\tour\DATABASE_AND_DATAFLOW.md` - Database info
3. `g:\tour\API_TESTING_COMPLETE_GUIDE.md` - API endpoints
4. `g:\tour\SETUP_GUIDE_DUMMY_DATA_AND_LOGIN.md` - Detailed guide

**Check logs:**
1. Backend terminal - look for errors
2. Browser DevTools (F12) → Console - JS errors
3. Browser Network tab - see API responses

**Common mistakes:**
- ❌ Frontend and backend on same port
- ❌ Database not seeded
- ❌ JWT_SECRET not set
- ❌ Old token in localStorage
- ❌ MONGO_URI wrong

**You got this! 💪**
